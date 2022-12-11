from mod_python import apache
from json import dumps as jds
import urllib.parse as ups
import sanitizers
import friendlycaptcha


VALID_PARAMS = [
    ("name", False, sanitizers.sanitize_string),
    ("email", True, sanitizers.sanitize_email),
    ("phone", False, sanitizers.sanitize_string),
    ("message", False, sanitizers.sanitize_string),
    ("newsletter", False, sanitizers.sanitize_bool),
    ("frc-captcha-solution", True, friendlycaptcha.captcha_verify),
]


def validate_input(params: dict) -> list:
    output = []
    for vp in VALID_PARAMS:
        pname = vp[0]
        prequired = vp[1]
        if prequired and pname not in params:
            output.append({pname: "Missing required"})
    return output

def sanitise_input(params: dict) -> dict:
    sanitised = {}
    for vp in VALID_PARAMS:
        pname = vp[0]
        pval = params.get(pname)
        if pval is not None:
            phandler = vp[2]
            if type(pval) is list:
                sanitised[pname] = [phandler(original) for original in pval]
            else:                
                sanitised[pname] = phandler(pval)
    return sanitised

def form_contact(req):
    output = {
        "errors": []
    }
    rawdata = req.read().decode()
    req.log_error(rawdata,  apache.APLOG_ERR)
    rawparams = ups.parse_qs(rawdata)
    req.log_error("Parsed params: %s" % str(rawparams), apache.APLOG_ERR)
    validationErrors = validate_input(params=rawparams)
    if len(validationErrors) > 0:
        output["errors"] = validationErrors
    else:
        try:
            sanitised = sanitise_input(rawparams)
            output["name"] = sanitised["name"]
            req.log_error("Sanitised input: %s" % jds(sanitised), apache.APLOG_DEBUG)
        except sanitizers.SanitiserException as sex:
            errstr = "Invalid input: %s" % sex.message
            output["errors"].append(errstr)
            req.log_error(errstr)
        except friendlycaptcha.CaptchaVerifyException as cve:
            errstr = "Captcha verification error: %s" % cve.message
            output["errors"].append(errstr)
            req.log_error(errstr)
    
    req.content_type = "application/json"
    req.write(jds(output))
    return apache.OK
