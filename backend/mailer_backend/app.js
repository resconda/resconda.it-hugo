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

const verifyCaptcha = async (solution) => {
  if (process.env.NODE_ENV === "test") {
    logger.debug(`[verifyCaptcha] Running in test mode, returning success for solution[${solution}]`);
    return { }; // In test mode, always return success
  }
  return await (await fetch(`http://captcha:3000/?frc-captcha-solution=${solution}`)).json();
}
app.route("/",)
.get(async (req, res) => {
  res.set("Content-Type", "application/json")
  let response = await BrevoHandler.listInfo();
  if (response.error) {
    logger.error(response.error, "Error getting Brevo list info");
    res.send({error: `brevo request failed: ${response.error.message}`}); 
  }else{
    res.send(JSON.stringify(response));
  }
})
.post(async (req, res) => {
  let brevoResponse;
  logger.info(`new member add request received. body[${JSON.stringify(req.body)}]`);

  res.set("Content-Type", "application/json")
  
  // verify captcha response
  let solution = req.body["frc-captcha-solution"];
  if(!solution){
    res.status(400).send({errors: ["Verifica captcha non valida"]});
    return;
  }
  let verifyResult = verifyCaptcha(solution);
  logger.info(verifyResult, "[captcha] verifyResult");
  if(verifyResult.error){
    res.status(200).send({errors: ["Verifica captcha fallita."]}); // verification failed is expected to yield a 200 status
    return;
  }
  // 200 and no errors means that the captcha was verified
  
  // add user to brevo list
  brevoResponse = await BrevoHandler.addMemberDOI(req.body);
  logger.info(brevoResponse, "brevoResponse");
  if (brevoResponse.error) {
    logger.error(brevoResponse.error, "Error adding member to Brevo list");
    if(brevoResponse.error.code === BrevoDuplicatedContactErrorCode){
      res.status(400).send({ errors: [`L'indirizzo email ${req.body.email} risulta già registrato`] });
    }else{
      res.send({ errors: [`Non è stato possibile registrare il contatto. Riprova più tardi o scrivici a info@resconda.it`] });
    }
    return;
  }else{
    res.status(201).send({});
    return;
  }
  
  // prepare and send feedback email
  const contactName = req.body.name ?? "nuov@ iscritt@";
  try {
    SendmailHelper.sendMail(
      brevoResponse.email_address,
      "Ti sei iscritto alla newsletter di ResConDA",
      WelcomeEmail.plain(contactName),
      WelcomeEmail.html(contactName),
    ).then((info) => {
      logger.info(`Welcome email sent to ${brevoResponse.email_address}. Mailchimp result: ${JSON.stringify(info)}`)
      res.status(201).send({});
    }).catch((error) => {
      logger.info(error);
      res.send({ errors: ["Registrazione avvenuta con successo, ma non siamo riusciti a inviarti la mail di benvenuto."] });
    });
  } catch (error) {
    res.send({ errors: ["Registrazione avvenuta con successo, ma non siamo riusciti a inviarti la mail di benvenuto."]});
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
const server = app.listen(port, () => {
  logger.info(`Mailer app listening on port ${port}`)
});

export default server;
