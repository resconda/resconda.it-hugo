from mod_python import apache
from json import dumps as jds
import urllib.parse as ups
import sanitizers
import friendlycaptcha
from smtplib import SMTP
import mailtrain

SITEADMIN = {
    "name": "Marcello Corongiu",
    "email": "info@resconda.it",
}

VALID_PARAMS = [
    ("name", False, sanitizers.sanitize_string),
    ("email", True, sanitizers.sanitize_email),
    ("phone", False, sanitizers.sanitize_string),
    ("message", False, sanitizers.sanitize_string),
    ("newsletter", False, sanitizers.sanitize_bool),
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


def captcha_verify(req, solution: str):
    opts = req.get_options()
    req.log_error("Request options: %s" % str(opts), apache.APLOG_DEBUG)
    secret = opts.get("FRIENDLY_CAPTCHA_SECRET")
    sitekey = opts.get("FRIENDLY_CAPTCHA_SITEKEY")
    friendlycaptcha.captcha_verify(solution, secret, sitekey)


def add_mailtrain_subscription(req, input: dict):
    opts = req.get_options()
    listid = opts.get("MAILTRAIN_LISTID")
    access_token = opts.get("MAILTRAIN_ACCESSTOKEN")
    try:
        mailtrain.add_subscription(listid, access_token, input)


def send_contact_notification(input: dict):
    name = dict.get("name")
    email = dict.get("email")
    message = dict.get("message", "")
    if dict.get("newsletter", False):
        message += "\n\nHo richiesto l'iscrizione alla newletter."
    # make sure the user provided all the parameters
    if not (name and email and message):
        return "A required parameter is missing, \
               please go back and correct the error"

    # create the message text
    msg = """\
From: %s <%s>
Subject: [resconda.it] richiesta di contatto
To: %s

Ho inviato una richiesta di contatto dal form web.

%s

Grazie,
%s

""" % (name, email, SITEADMIN["email"], message, name)

    # send it out
    conn = SMTP("localhost")
    conn.sendmail(email, [SITEADMIN["name"]], msg)
    conn.quit()


def process_form_input(input: dict):
    send_contact_notification(input)
    if input.get("newsletter", False):
        add_mailtrain_subscription(input)


def form_contact(req):
    output = {
        "errors": []
    }
    rawdata = req.read().decode()
    req.log_error(rawdata,  apache.APLOG_DEBUG)
    # parse_qs yields a dict whose values are all lists of values,
    # so that multiple occurrences of a parameter are handled
    # hence we must always handle lists, even when only one value is expected
    rawparams = ups.parse_qs(rawdata)
    req.log_error("Parsed params: %s" % str(rawparams), apache.APLOG_DEBUG)
    validationErrors = validate_input(params=rawparams)
    if len(validationErrors) > 0:
        output["errors"] = validationErrors
    else:
        try:
            sanitised = sanitise_input(rawparams)
            output["name"] = sanitised["name"]
            req.log_error("Sanitised input: %s" % jds(sanitised), apache.APLOG_DEBUG)
            solution = rawparams.get("frc-captcha-solution", [""])
            captcha_verify(req, solution[0])
            process_form_input(sanitised)
        except sanitizers.SanitiserException as sex:
            errstr = "Invalid input"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(sex)))
        except friendlycaptcha.CaptchaVerifyException as cve:
            errstr = "Invalid input"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(cve)))
        except mailtrain.MailtrainException as mex:
            errstr = "Invalid input"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(mex)))

    req.content_type = "application/json"
    req.write(jds(output))
    return apache.OK
