from mod_python import apache
from json import dumps as jds
import urllib.parse as ups
import re


def _sanitize_email(input) -> str:
    tostr = _sanitize_string(input)
    email_reg = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    if re.match(tostr):
        return tostr
    else:
        apache.log_error("[%s] Invalid email: %s" % (__name__, tostr), apache.APLOG_ERR)
        return None

def _sanitize_bool(input) -> bool:
    if type(input) is bool:
        return input
    if type(input) is int:
        return input != 0
    if type(input) is str:
        return input != "0"


def _sanitize_string(input) -> str:
    if type(input) is bytes:
        return input.decode()
    elif type(input) is str:
        return input
    else:
        return None


VALID_PARAMS = [
    ("name", False, _sanitize_string),
    ("email", True, _sanitize_email),
    ("phone", False, _sanitize_string),
    ("message", False, _sanitize_string),
    ("newsletter", False, _sanitize_bool),
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
        sanitised = sanitise_input(rawparams)
        req.log_error("Sanitised input: %s" % jds(sanitised))
    
    req.content_type = "application/json"
    req.write(jds(output))
    return apache.OK
