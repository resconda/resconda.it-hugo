from mod_python import apache
from json import dumps as jds
import urllib.parse as ups


def _sanitize_bool(input) -> bool:
    if type(input) is bool:
        return input
    if type(input) is int:
        return input != 0
    if type(input) is str:
        return input != "0"


def _sanitize_string(input) -> str:
    if type(input) in [str, bytes]:
        return ups.unquote_plus(input)
    else:
        return None


VALID_PARAMS = [
    ("name", False, _sanitize_string),
    ("email", True, _sanitize_string),
    ("phone", False, _sanitize_string),
    ("message", False, _sanitize_string),
    ("newsletter", True, _sanitize_bool),
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
            sanitised[pname] = phandler(pval)
    return sanitised

def form_contact(req):
    output = {
        "errors": []
    }
    rawdata = req.read()
    req.log_error(rawdata.decode(),  apache.APLOG_ERR)
    rawparams = ups.parse_qsl(rawdata)
    validationErrors = validate_input(params=rawparams)
    if len(validationErrors) > 0:
        output["errors"] = validationErrors
    else:
        sanitised = sanitise_input(rawparams)
        req.log_error("Sanitised input: %s" % jds(sanitised))
    
    req.content_type = "application/json"
    req.write(jds(output))
    return apache.OK
