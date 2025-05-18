import express from 'express'
import {FriendlyCaptchaHelper, ResultCodes } from './friendlycaptcha.js'

const app = express()

const port = 3000

app.route("/",)
.get(async (req, res) => {
  let solution = req.query["frc-captcha-solution"];
  if(!solution){
    res.status(400).send({error: "Invalid 'frc-captcha-solution' input"});
  }
  let verifyResult = await FriendlyCaptchaHelper.verify(solution);
  let resBody = {};
  switch (verifyResult) {
    case ResultCodes.verifySuccess:
        break;
    case ResultCodes.verifyFail:
        resBody = {error: "Captcha verification failed"};
        break;
    case ResultCodes.couldNotVerify:
        resBody = {error: "Verification error"};
        res.status(500);
        break;
    default:
        resBody = {error: "Unexpected error"};
        console.log(`Verify call returned error code ${verifyResult}`);
        res.status(500);
        break;
  }
  res.append("Content-Type", "application/json")
    .send(resBody);
})

app.listen(port, () => {
    console.log(`Captcha app listening on port ${port}`)
  })
  
