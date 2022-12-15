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
    "webmasterSender": "no-reply@resconda.it",
}

VALID_PARAMS = [
    ("name", False, sanitizers.sanitize_string),
    ("email", True, sanitizers.sanitize_email),
    ("phone", False, sanitizers.sanitize_string),
    ("message", False, sanitizers.sanitize_string),
    ("newsletter", False, sanitizers.sanitize_bool),
]

class ContactException(Exception):
    pass


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
    req.log_error("%s" % __name__, apache.APLOG_DEBUG)
    opts = req.get_options()
    req.log_error("Request options: %s" % str(opts), apache.APLOG_DEBUG)
    secret = opts.get("FRIENDLY_CAPTCHA_SECRET")
    sitekey = opts.get("FRIENDLY_CAPTCHA_SITEKEY")
    friendlycaptcha.captcha_verify(solution, secret, sitekey)


def add_mailtrain_subscription(req, input: dict):
    req.log_error("%s" % __name__, apache.APLOG_DEBUG)
    opts = req.get_options()
    listid = opts.get("MAILTRAIN_LISTID")
    access_token = opts.get("MAILTRAIN_ACCESSTOKEN")
    mailtrain.add_subscription(listid, access_token, input)


def send_contact_notification(input: dict):
    name = input.get("name")
    contactEmail = input.get("email")
    message = input.get("message", "")
    if input.get("newsletter", False):
        message += "\n\nHo richiesto l'iscrizione alla newletter."
    
    # create the message text
    msg = """\
From: {webmaster}
Subject: Richiesta di contatto da {contactName} <{contactEmail}>
To: {siteAdminEmail}

Ho inviato una richiesta di contatto dal form web.

{contactMessage}

Grazie,
{contactName}

""".format(
    webmaster=SITEADMIN["webmasterSender"],
    contactName=name,
    contactEmail=contactEmail,
    siteAdminEmail=SITEADMIN["email"],
    contactMessage=message)

    # send it out
    conn = SMTP("localhost")
    try:
        conn.sendmail(SITEADMIN["webmasterSender"], [SITEADMIN["email"]], msg)
    except Exception as ex: # SMTPlib has too many flavour of exception to handle them all
        raise ContactException("sendmail error: {}".format(str(ex)))
    finally:
        conn.quit()


def process_form_input(req, input: dict):
    req.log_error("%s" % __name__, apache.APLOG_DEBUG)
    send_contact_notification(input)
    if input.get("newsletter", False):
        req.log_error("Newsletter subscription requested", apache.APLOG_DEBUG)
        add_mailtrain_subscription(req, input)


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
            # flatten the input before consuming it
            mangledinput = {x:sanitised[x][0] for x in sanitised}

            process_form_input(req, mangledinput)
        except sanitizers.SanitiserException as sex:
            errstr = "Invalid input"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(sex)))
        except friendlycaptcha.CaptchaVerifyException as cve:
            errstr = "Invalid input"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(cve)))
        except ContactException as ce:
            errstr = "Server error. Please write to <a href=\"mailto:info@resconda.it\">info@resconda.it</a>"
            output["errors"].append(errstr)
            req.log_error(str(ce))
        except mailtrain.MailtrainException as mex:
            errstr = "Invalid input"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(mex)))

    req.content_type = "application/json"
    req.write(jds(output))
    return apache.OK
