from os import environ
import requests

CAPTCHAURL = "https://api.friendlycaptcha.com/api/v1/siteverify"


class CaptchaVerifyException(Exception):
    pass

def captcha_verify(solution, secret, key):
    if secret is None or key is None:
        raise CaptchaVerifyException("FriendlyCaptcha key/secret are missing")
    r = requests.post(CAPTCHAURL, data={
        "solution": solution,
        "secret": secret,
        "sitekey": key,
    })
    try:
        rdict = r.json()
        if rdict and type(rdict) is dict:
            successString = rdict.get("success", False)
            if successString is not True:
                raise CaptchaVerifyException(
                    "Captcha verfification failed: %s" % str(rdict))
        else:
            raise CaptchaVerifyException("Invalid response to captcha verification call")
    except Exception as ex:
        raise CaptchaVerifyException(str(ex))