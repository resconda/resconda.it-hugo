from ast import parse
from mod_python import apache
from json import dumps as jds
from urllib.parse import parse_qs
import sanitizers
import friendlycaptcha
from smtplib import SMTP
import mailchimp

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
    ("privacy", True, sanitizers.sanitize_bool),
]

class ContactException(Exception):
    pass


class PrivacyGrantException(Exception):
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
    req.log_error("%s" % "captcha_verify", apache.APLOG_DEBUG)
    opts = req.get_options()
    req.log_error("Request options: %s" % str(opts), apache.APLOG_DEBUG)
    secret = opts.get("FRIENDLY_CAPTCHA_SECRET")
    sitekey = opts.get("FRIENDLY_CAPTCHA_SITEKEY")
    friendlycaptcha.captcha_verify(solution, secret, sitekey)

# def add_mailtrain_subscription(req, input: dict):
#     req.log_error("%s" % "add_mailtrain_subscription", apache.APLOG_DEBUG)
#     opts = req.get_options()
#     listid = opts.get("MAILTRAIN_LISTID")
#     access_token = opts.get("MAILTRAIN_ACCESSTOKEN")
#     mailtrain.add_subscription(listid, access_token, input)

def add_mailchimp_subscription(req, input: dict):
    req.log_error("%s" % "add_mailchimp_subscription", apache.APLOG_DEBUG)
    opts = req.get_options()
    listid = opts.get("MAILCHIMP_AUDIENCE_ID")
    mailchimp.add_subscription(listid, input)

def send_contact_notification(input: dict):
    name = input.get("name")
    contactEmail = input.get("email")
    message = input.get("message", "")
    
    # create the message text
    msg = """\
From: {webmaster}
Subject: Richiesta iscrizione alla newsletter da {contactName} <{contactEmail}>
To: {siteAdminEmail}

Mi sono iscritt@!

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
    # verify 'privacy' checkbox was checked
    if input.get('privacy', False) is False:
        raise PrivacyGrantException("Privacy policy has not been accepted by the user")
    send_contact_notification(input)
    add_mailtrain_subscription(req, input)


def form_contact(req):
    output = {
        "errors": []
    }
    reqdata = req.read()
    rawparams = parse_qs(reqdata.decode())
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
            errstr = "Captcha verification failed"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(cve)))
        except PrivacyGrantException as pg:
            errstr = str(pg)
            output["errors"].append(errstr)
            req.log_error(errstr)
        except ContactException as ce:
            errstr = "Server error. Please write to <a href=\"mailto:info@resconda.it\">info@resconda.it</a>"
            output["errors"].append(errstr)
            req.log_error(str(ce))
        except mailchimp.MailchimpException as mex:
            errstr = "Subscription failed"
            output["errors"].append(errstr)
            req.log_error("%s: %s" % (errstr, str(mex)))

    req.content_type = "application/json"
    req.write(jds(output))
    return apache.OK
