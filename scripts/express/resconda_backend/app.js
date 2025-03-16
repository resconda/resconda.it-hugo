const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MailchimpHandler = require("./mailchimp")
const SendmailHelper = require('./sendmail')
const WelcomeEmail = require('./welcome_email')
app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
  console.log(req.body);
  res.set("Content-Type", "application/json")
  try {
    mailchimpResponse = await MailchimpHandler.addMember(req.body);
  } catch (error) {
    res.send({ error: `Failed to register user: ${error.message}` });
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
        sendResponse = err;
      }else{
        console.log(info)
        sendResponse = info;
      }
      res.send(JSON.stringify(sendResponse));
    });
  } catch (error) {
    res.send({ error: `Failed to send welcome mesasge to user: ${error.message}`});
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
