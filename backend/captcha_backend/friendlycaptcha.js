const friendlyCaptchaURL_v2 = "https://global.frcapi.com/api/v2/captcha/siteverify"; // v2 API endpoint
const friendlyCaptchaURL_v1 = "https://api.friendlycaptcha.com/api/v1/siteverify"; // v1 API endpoint
const friendlyCaptchaApiKey = process.env.FRIENDLY_CAPTCHA_SECRET;
const friendlyCaptchaSitekey = process.env.FRIENDLY_CAPTCHA_SITEKEY;

var myFCclient = {
    url: (version) => {
        if(version === 1){
            return friendlyCaptchaURL_v1;
        }else{
            return friendlyCaptchaURL_v2;
        }
    },
    key: friendlyCaptchaApiKey,
    site: friendlyCaptchaSitekey,
    body: function(solution, version) {
        let solution_key = version === 1 ? "solution" : "response";
        var retobj = {
            [solution_key]: solution,
            sitekey: this.site,
        };
        if(version === 1){
            retobj["secret"] = this.key;
        }
        return retobj;
    },
    header: function(version) {
        var retobj = {
            'Content-Type': 'application/json',
        };
        if(version === 2) {
            retobj["X-API-Key"] = this.key;
        }
        return retobj;
    }
}

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
        console.log(`[FriendlyCaptchaHelper.verify] verifying site[${centerEllipsis(myFCclient.site, 3)}] key[${centerEllipsis(myFCclient.key)}] solution[${centerEllipsis(solution)}]`)
        const fc_response = await fetch(myFCclient.url(1), {
            method: 'POST',
            headers: myFCclient.header(1),
            body: JSON.stringify(myFCclient.body(solution, 1)),
        });
        if(!fc_response.ok){
            console.log(`FriendlyCaptcha verification failed: ${fc_response.statusText}`);
            return ResultCodes.couldNotVerify;
        }
        const result = await fc_response.json();
        console.log(`FriendlyCaptcha verification result: ${JSON.stringify(result)}`);
        if(result.success == true){
            return ResultCodes.verifySuccess;
        }else{
            return ResultCodes.verifyFail;
        }
    },
}
