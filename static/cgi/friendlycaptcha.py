from os import environ
import requests

CAPTCHASECRET = environ["FRIENDLY_CAPTCHA_SECRET"]
CAPTCHAKEY = environ["FRIENDLY_CAPTCHA_SITEKEY"]
CAPTCHAURL = "https://api.friendlycaptcha.com/api/v1/siteverify"


class CaptchaVerifyException(Exception):
    pass

def captcha_verify(solution) -> bool:
    r = requests.post(CAPTCHAURL, data={
        "solution": solution,
        "secret": CAPTCHASECRET,
        "sitekey": CAPTCHAKEY,
    })
    try:
        rdict = r.json()
        if rdict and type(rdict) is dict:
            successString = rdict.get("success")
            if successString != "true":
                raise CaptchaVerifyException(
                    "Captcha verfification failed")
        else:
            raise CaptchaVerifyException("Invalid response to captcha verification call")
    except requests.exceptions.JSONDecodeError as jde:
        raise jde