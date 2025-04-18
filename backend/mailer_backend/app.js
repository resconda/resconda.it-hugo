const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MailchimpHandler = require("./mailchimp")
const SendmailHelper = require('./sendmail')
const WelcomeEmail = require('./welcome_email')
app.use(bodyParser.json()) // for parsing application/json

const port = 3000

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
  let mailchimpResponse;
  console.log(`new member add request received. body[${JSON.stringify(req.body)}]`);

  res.set("Content-Type", "application/json")
  
  // verify captcha response
  let solution = req.body["frc-captcha-solution"];
  if(!solution){
    res.status(400).send({errors: ["Invalid 'frc-captcha-solution' input"]});
    return;
  }
  let verifyResult = await (await fetch(`http://captcha:3000/?frc-captcha-solution=${solution}`)).json();
  console.log(`[captcha] verifyResult[${JSON.stringify(verifyResult)}]`);
  if(verifyResult.error){
    res.status(200).send({errors: [verifyResult.error]}); // verification failed is expected to yield a 200 status
    return;
  }
  // 200 and no errors means that the captcha was verified
  
  // add user to mailchimp list
  try {
    mailchimpResponse = await MailchimpHandler.addMember(req.body);
    console.log(`mailchimpResponse[${JSON.stringify(mailchimpResponse)}]`);
  } catch (error) {
    res.send({ errors: [`Failed to register user: ${error.message}`] });
    return;
  }
  
  // prepare and send feedback email
  const contactName = req.body.name ?? "nuov@ iscritt@";
  try {
    SendmailHelper.sendMail(
      mailchimpResponse.email_address,
      "Ti sei iscritto alla newsletter di ResConDA",
      WelcomeEmail.plain(contactName),
      WelcomeEmail.html(contactName),
    ).then((err, info) => {
      let sendResponse;
      if(err){
        console.log(err);
        sendResponse = {errors: [err]};
      }else{
        console.log(info)
        sendResponse = info;
      }
      res.send(JSON.stringify(sendResponse));
    });
  } catch (error) {
    res.send({ errors: [`Failed to send welcome mesasge to user: ${error.message}`]});
  }
  
})
// DEBUG
app.get("/list/:listId", async (req, res) => {
  let listid = req.params.listId;
  let response = await MailchimpHandler.listInfo(listid);
  res.set("Content-Type", "application/json")
  res.send(JSON.stringify(response));
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
