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
            }
        }
    }
}


class MailtrainException(Exception):
    pass


def add_subscription(listid: str, access_token: str, input: dict):
    email = input.get("email", None)

    if email is None:
        raise MailtrainException("%s invalid input: 'email' field is missing" % __name__)
    if LISTS.get(listid) is None:
        raise MailtrainException(
            "%s invalid listid %s" % listid)
    posturl = urljoin(MAILTRAIN_URL, MAILTRAIN_SUBSCRIBE_URI)
    posturl = urljoin(posturl, listid)
    posturl += "?access_token=%s" % access_token

    postdata = {"EMAIL": email}
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
                    raise MailtrainException("Invalid response content: %s" % rdata)
            else:
                raise MailtrainException(
                    "Invalid response content: %s" % rdata)
        else:
            raise MailtrainException(
                "Invalid response to 'Add subscription' Mailtrain API call")
    except Exception as ex:
        raise MailtrainException(str(ex))
