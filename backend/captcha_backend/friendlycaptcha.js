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

const centerEllipsis = function(str, trailingcharacters=5) {
    if(str.length > 2*trailingcharacters){
        return str.slice(0, trailingcharacters) + "..." + str.slice(-trailingcharacters);
    }else{
        return str;
    }
}

export const FriendlyCaptchaHelper = {
    verify: async (solution) => {
        console.log(`[FriendlyCaptchaHelper.verify] verifying site[${centerEllipsis(frcClient.sitekey, 3)}] key[${centerEllipsis(frcClient.apiKey)}] solution[${centerEllipsis(solution)}]`)
        const result = await frcClient.verifyCaptchaResponse(solution);
        if(result.wasAbleToVerify()){
            var retcode;
            if(result.shouldAccept()){
                retcode = ResultCodes.verifySuccess;
            }else{
                retcode = ResultCodes.verifyFail;
            }
            console.log(`${JSON.stringify(result.getResponse())}`);
            return retcode;
        }else{
            console.log(result.getResponseError());
            return ResultCodes.couldNotVerify;
        }
    },
}
