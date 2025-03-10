const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MailchimpHandler = require("./mailchimp")
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
  console.log(req.body);
  res.set("Content-Type", "application/json")
  try {
    let response = await MailchimpHandler.addMember(req.body);
    res.send(JSON.stringify(response));
  } catch (error) {
    res.send({error: `Failed to register user: ${error.message}`}); 
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
