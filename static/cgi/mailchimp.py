from os import environ
from urllib import response
from mailchimp_marketing import Client
from mailchimp_marketing.api_client import ApiClientError
from json import loads as jlds

class MailchimpException(Exception):
    def __init__(self, message, url="URL not defined"):
      super().__init__()
      self.message = message
      self.url = url
    
    def __str__(self):
        return "[Mailtrain] {url} - {msg}".format(url=self.url, msg=self.message)

def add_subscription(list_id: str, input: dict):
    mailchimp_api_key = environ.get('MAILCHIMP_API_KEY') # to be defined eg. at Apache level
    mailchimp = Client()
    mailchimp.set_config({
        "api_key": mailchimp_api_key,
        "server": "us17"
    })

    email: str = input.get("email", None)

    if email is None:
        raise MailchimpException(f"{__name__} invalid input: 'email' field is missing")

    
    member_info = {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {}
    }
    for (i,f) in [
        ("name","FNAME"),
        ("surname","LNAME"),
        ("phone","PHONE"),
    ]:
        if i in input:
            member_info["merge_fields"][f] = input[i]

    try:
        raw_response = mailchimp.lists.add_list_member(list_id, member_info)
        response = jlds(raw_response)
        if response.get("id") is None:
            error = response.get("error", "unknown error")
            raise MailchimpException(f"Mailchimp API: POST /lists/members returned error: {error}")
    except ApiClientError as error:
        errtext = error.text
        raise MailchimpException(f"Mailchimp API: POST /lists/members FAIL: {errtext}")