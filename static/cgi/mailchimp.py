from os import environ
from mailchimp_marketing import Client
from mailchimp_marketing.api_client import ApiClientError

mailchimp_api_key = environ.get('MAILCHIMP_API_KEY') # to be defined eg. at Apache level
mailchimp = Client()
mailchimp.set_config({
  "api_key": mailchimp_api_key,
  "server": "us17"
})

try:
    response = mailchimp.ping.get()
    print(response)
except ApiClientError as ace:
    print(f"ERROR: {str(ace)}")