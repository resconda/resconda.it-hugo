import express from "express";
import bodyParser from "body-parser";
import { MailchimpHandler } from "./mailchimp.js";
import { BrevoHandler } from "./brevo.js";
import { SendmailHelper } from "./sendmail.js";
import { WelcomeEmail } from "./welcome_email.js";

const port = 3000
const app = express()
app.use(bodyParser.json()) // for parsing application/json

const verifyCaptcha = async (solution) => {
  if (process.env.NODE_ENV === "test") {
    console.log(`[verifyCaptcha] Running in test mode, returning success for solution[${solution}]`);
    return { }; // In test mode, always return success
  }
  return await (await fetch(`http://captcha:3000/?frc-captcha-solution=${solution}`)).json();
}
app.route("/",)
.get(async (req, res) => {
  res.set("Content-Type", "application/json")
  try {
    let response = await MailchimpHandler.ping();
    res.send(JSON.stringify(response));
  } catch (error) {
    res.send({error: `mailchimp request failed: ${error.message}`}); 
  }
})
.post(async (req, res) => {
  let brevoResponse;
  console.log(`new member add request received. body[${JSON.stringify(req.body)}]`);

  res.set("Content-Type", "application/json")
  
  // verify captcha response
  let solution = req.body["frc-captcha-solution"];
  if(!solution){
    res.status(400).send({errors: ["Verifica captcha non valida"]});
    return;
  }
  let verifyResult = verifyCaptcha(solution);
  console.log(`[captcha] verifyResult[${JSON.stringify(verifyResult)}]`);
  if(verifyResult.error){
    res.status(200).send({errors: ["Verifica captcha fallita."]}); // verification failed is expected to yield a 200 status
    return;
  }
  // 200 and no errors means that the captcha was verified
  
  // add user to brevo list
  try {
    brevoResponse = await BrevoHandler.addMember(req.body);
    console.log(`brevoResponse: id[${brevoResponse.id}] email[${brevoResponse.email_address}] status[${brevoResponse.status}]`);
  } catch (error) {
    res.send({ errors: [`Non è stato possibile registrare il contatto. Riprova più tardi o scrivici a info@resconda.it`] });
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
      console.log(`Welcome email sent to ${brevoResponse.email_address}. Mailchimp result: ${JSON.stringify(info)}`)
      res.status(201).send({});
    }).catch((error) => {
      console.log(error);
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
        console.log(`Test email sent: ${JSON.stringify(info)}`);
        res.send({status: "success", info: info});
      });
    } catch (error) {
      console.error(`Error sending test email: ${error}`);
      res.status(500).send({status: "error", message: error.message});
    }
  });
}
const server = app.listen(port, () => {
  console.log(`Mailer app listening on port ${port}`)
});

export default server;
