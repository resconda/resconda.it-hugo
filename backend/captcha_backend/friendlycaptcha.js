import {  FriendlyCaptchaClient  } from "@friendlycaptcha/server-sdk";

const frcClient = new FriendlyCaptchaClient({
  apiKey: process.env.FRIENDLY_CAPTCHA_SECRET,
  sitekey: process.env.FRIENDLY_CAPTCHA_SITEKEY,
});

export const ResultCodes = {
    verifySuccess: 0,
    verifyFail: 1,
    couldNotVerify: 2,
};

export const FriendlyCaptchaHelper = {
    verify: async (solution) => {
        const result = await frcClient.verifyCaptchaResponse(solution);
        if(result.wasAbleToVerify()){
            if(result.shouldAccept()){
                return ResultCodes.verifySuccess;
            }else{
                return ResultCodes.verifyFail;
            }
        }else{
            console.log(result.getResponseError());
            return ResultCodes.couldNotVerify;
        }
    },
}
