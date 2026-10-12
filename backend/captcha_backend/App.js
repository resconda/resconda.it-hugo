import express from 'express'
import {FriendlyCaptchaHelper, ResultCodes } from './friendlycaptcha.js'
import logger from './logger.js';

const app = express()

const port = 3000

app.route("/",)
.get(async (req, res) => {
  res.set("Content-Type", "application/json")
  let solution = req.query["frc-captcha-solution"];
  if(!solution){
    // return is required: without it the handler went on and tried to send a second
    // response, throwing ERR_HTTP_HEADERS_SENT and crashing the process
    return res.status(400).send({error: "Invalid 'frc-captcha-solution' input"});
  }
  let verifyResult;
  try {
    verifyResult = await FriendlyCaptchaHelper.verify(solution);
  } catch (error) {
    // network error towards the FriendlyCaptcha API: report it instead of crashing
    logger.error(error, "FriendlyCaptcha verify call failed");
    verifyResult = ResultCodes.couldNotVerify;
  }
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
        logger.error(`Verify call returned error code ${verifyResult}`);
        res.status(500);
        break;
  }
  return res.send(resBody);
})

process.on("unhandledRejection", (reason) => {
  logger.error(reason, "Unhandled promise rejection");
});

app.listen(port, () => {
    logger.info(`Captcha app listening on port ${port}`)
  })