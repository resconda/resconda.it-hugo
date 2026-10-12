import express from "express";
import bodyParser from "body-parser";
import { MailchimpHandler } from "./mailchimp.js";
import { BrevoHandler, BrevoDuplicatedContactErrorCode } from "./brevo.js";
import { SendmailHelper } from "./sendmail.js";
import { WelcomeEmail } from "./welcome_email.js";
import logger from './logger.js';

const port = 3000
const app = express()

app.use(bodyParser.json()) // for parsing application/json

// Ask the captcha microservice to verify the FriendlyCaptcha solution.
// Returns one of:
//   { ok: true }                      -> solution verified
//   { ok: false, rejected: true }     -> solution explicitly rejected (likely a bot)
//   { ok: false, unavailable: true }  -> could not verify (captcha service or FriendlyCaptcha API down/misconfigured)
const verifyCaptcha = async (solution) => {
  if (process.env.NODE_ENV === "test") {
    logger.debug(`[verifyCaptcha] Running in test mode, returning success for solution[${solution}]`);
    return { ok: true }; // In test mode, always return success
  }
  let response;
  try {
    response = await fetch(`http://captcha:3000/?frc-captcha-solution=${encodeURIComponent(solution)}`);
  } catch (error) {
    logger.error(error, "[captcha] captcha service unreachable");
    return { ok: false, unavailable: true };
  }
  let body = {};
  try {
    body = await response.json();
  } catch (error) {
    logger.error({ status: response.status }, "[captcha] captcha service returned a non-JSON response");
    return { ok: false, unavailable: true };
  }
  logger.info({ status: response.status, body }, "[captcha] verifyResult");
  if (response.status >= 500) {
    return { ok: false, unavailable: true };
  }
  if (body.error) {
    return { ok: false, rejected: true };
  }
  return { ok: true };
}

const GENERIC_ERROR = "Non è stato possibile registrare il contatto. Riprova più tardi o scrivici a info@resconda.it";

app.route("/",)
//// No need to expose this as public route
// .get(async (req, res) => {
//   res.set("Content-Type", "application/json")
//   let response = await BrevoHandler.listInfo();
//   if (response.error) {
//     logger.error(response.error, "Error getting Brevo list info");
//     res.send({error: `brevo request failed: ${response.error.message}`}); 
//   }else{
//     res.send(JSON.stringify(response));
//   }
// })
.post(async (req, res) => {
  res.set("Content-Type", "application/json");
  // NOTE: every error path below MUST be handled here. An unhandled exception/rejection
  // inside this async handler crashes the Node process (Express 4 does not catch it),
  // which makes nginx answer 502 and the user sees "Errore del server".
  try {
    const body = req.body ?? {};
    logger.info(body, "new member add request received");

    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!email) {
      return res.status(400).send({ errors: ["Indirizzo email mancante o non valido"] });
    }

    // verify captcha response
    const solution = body["frc-captcha-solution"];
    if (!solution) {
      return res.status(400).send({ errors: ["Verifica captcha non valida. Ricarica la pagina e riprova."] });
    }
    const captcha = await verifyCaptcha(solution);
    if (captcha.rejected) {
      return res.status(400).send({ errors: ["Verifica captcha fallita. Ricarica la pagina e riprova."] });
    }
    if (captcha.unavailable) {
      // Fail open: if the captcha cannot be verified because of a problem on OUR side,
      // we still accept the request (Brevo double opt-in protects the list anyway)
      // instead of losing a real subscriber. The problem is logged so it can be fixed.
      logger.warn({ email }, "[captcha] could not verify solution, accepting request anyway (fail-open)");
    }

    // add user to brevo list (double opt-in: Brevo sends the confirmation email)
    const brevoResponse = await BrevoHandler.addMemberDOI({ ...body, email });
    if (brevoResponse !== undefined && brevoResponse !== null && brevoResponse.error) { // brevoResponse is undefined in case of success
      logger.error(brevoResponse.error, "Error adding member to Brevo list");
      if (brevoResponse.error.code === BrevoDuplicatedContactErrorCode) {
        return res.status(409).send({ errors: [`L'indirizzo email ${email} risulta già registrato`] });
      }
      return res.status(502).send({ errors: [GENERIC_ERROR] });
    }
    logger.info({ email }, "member added to Brevo (double opt-in email sent)");
    return res.status(201).send({});
  } catch (error) {
    logger.error(error, "Unexpected error while handling subscription request");
    if (!res.headersSent) {
      return res.status(500).send({ errors: [GENERIC_ERROR] });
    }
  }
});
// DEBUG
if (process.env.NODE_ENV === "test") {
  app.get("/list/:listId", async (req, res) => {
    let listid = req.params.listId;
    let response = await MailchimpHandler.listInfo(listid);
    res.set("Content-Type", "application/json")
    res.send(JSON.stringify(response));
  });
  app.get("/testsend", async (req, res) => {
    try {
      let response = await SendmailHelper.sendMail(
        "test@example.com",
        "Test Email",
        "This is a test email sent from the mailer backend.",
        "<p>This is a test email sent from the mailer backend.</p>",
      ).then((info) => {
        logger.info(`Test email sent: ${JSON.stringify(info)}`);
        res.send({status: "success", info: info});
      });
    } catch (error) {
      logger.error(`Error sending test email: ${error}`);
      res.status(500).send({status: "error", message: error.message});
    }
  });
}
// Last line of defence: log instead of silently dying on stray async errors.
process.on("unhandledRejection", (reason) => {
  logger.error(reason, "Unhandled promise rejection");
});

const server = app.listen(port, () => {
  logger.info(`Mailer app listening on port ${port}`)
});

export default server;
