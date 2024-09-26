from mailchimp_marketing import Client
from mailchimp_marketing.api_client import ApiClientError
from json import loads as jlds

class MailchimpException(Exception):
    def __init__(self, message: str, url: str="URL not defined", apiresponse: dict=None):
      super().__init__()
      self.message = message
      self.url = url
      self.api_response = apiresponse
    
    def __str__(self):
        return "[Mailchimp] {url} - {msg}".format(url=self.url, msg=self.message)

class MailChimpHelper(object):
    def __init__(self, api_key: str) -> None:
        super().__init__()
        self.api_key = api_key

    def add_subscription(self, list_id: str, input: dict):
        mailchimp_api_key = self.api_key
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
            response: dict = mailchimp.lists.add_list_member(list_id, member_info)
            if response.get("id") is None:
                raise MailchimpException(message=f"Mailchimp API returned unexpected response", apiresponse=response, url="POST /lists/members")
        except ApiClientError as error:
            errdict = jlds(error.text)
            raise MailchimpException(message=f"Mailchimp API request failed", apiresponse=errdict, url="POST /lists/members")
