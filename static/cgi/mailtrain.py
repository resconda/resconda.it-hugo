from requests.compat import urljoin
import requests

MAILTRAIN_URL = "https://lists.resconda.it"
MAILTRAIN_SUBSCRIBE_URI = "/api/subscribe"

LISTS = {
    "EfWFUGIsZT": {
        "fields": {
            "name": {
                "name": "First Name",
                "type": "Text",
                "merge_tag": "MERGE_FIRST_NAME",
            },
            "surname": {
                "name": "Last Name",
                "type": "Text",
                "merge_tag": "MERGE_LAST_NAME",
            }
        }
    }
}


class MailtrainException(Exception):
    def __init__(self, message, url="URL not defined"):
      super().__init__()
      self.message = message
      self.url = url
    
    def __str__(self):
        return "[Mailtrain] {url} - {msg}".format(url=self.url, msg=self.message)


def add_subscription(listid: str, access_token: str, input: dict):
    email = input.get("email", None)

    if email is None:
        raise MailtrainException("%s invalid input: 'email' field is missing" % __name__)
    if LISTS.get(listid) is None:
        raise MailtrainException(
            "%s invalid listid %s" % listid)
    posturl = MAILTRAIN_URL + MAILTRAIN_SUBSCRIBE_URI + "/%s" % listid + "?access_token=%s" % access_token
    # name manipulation: if only 'name' was given and the string value has more than one word,
    # we try and guess the split btw first and last name(s)
    if "name" in input and "surname" not in input:
        namecomps = input["name"].split(" ")
        if len(namecomps) > 1:
            input["surname"] = " ".join(namecomps[1:])
    postdata = {
        "EMAIL": email,
        "MERGE_NON_ASSOCIATO": 1, # THANK YOU SO MUCH, MARCELLO
    }
    for k,v in input.items():
        mtMergeName = LISTS[listid]["fields"].get(k, {}).get("merge_tag", None)
        if mtMergeName:
            postdata[mtMergeName] = v
    r = requests.post(posturl, data=postdata)
    try:
        rdict = r.json()
        if rdict and type(rdict) is dict:
            rdata = rdict.get("data")
            if rdata:
                subscriptionID = rdata.get("id")
                if subscriptionID:
                    return subscriptionID
                else:
                    raise MailtrainException("Invalid response content: %s" % r.text, posturl)
            else:
                raise MailtrainException(
                    "Invalid response content: %s" % r.text, posturl)
        else:
            raise MailtrainException(
                "Invalid response to 'Add subscription' Mailtrain API call", posturl)
    except Exception as ex:
        raise MailtrainException(str(ex), posturl)
