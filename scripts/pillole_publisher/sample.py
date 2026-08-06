import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]


def main():
  """Shows basic usage of the Drive v3 API.
  Prints the names and ids of the first 10 files the user has access to.
  """
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "credentials.json", SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())

  try:
    service = build("drive", "v3", credentials=creds)

    # Call the Drive v3 API
    results = (
        service.drives()
        .list(q="name = 'COMUNICAZIONE'")
        .execute()
    )
    items = results.get("drives", [])

    if not items:
      print("No drives found.")
      return

    d_comunicazione = [d for d in items if d["name"] == "COMUNICAZIONE"]
    if len(d_comunicazione) == 0:
      print("No COMUNICAZIONE drive found.")
      return

    driveid = d_comunicazione[0]["id"]

    results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q="name contains 'pillole'").execute()
    items = results.get("files", [])
    
    print("Files '*pillole*' in COMUNICAZIONE:")
    for item in items:
      print(f"{item['name']} ({item['id']})")

    # Pillole Agosto 2026.docx (1wOGh_G-9jIQ0-ijf7W1-plgJ_xNRwKXN)
    result = service.files().get(fileId="1wOGh_G-9jIQ0-ijf7W1-plgJ_xNRwKXN", supportsAllDrives=True, fields="name,parents").execute()
    if result:
      print(result)
      pId = result["parents"][0]
      results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"'{pId}' in parents and name = 'IMMAGINI'").execute()
      items = results.get("files", [])
      if len(items) > 0:
        immagini_dir = items[0]
        results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"'{immagini_dir['id']}' in parents").execute()
        items = results.get("files", [])
        for item in items:
          print(f"{item['name']} ({item['id']})")
  except HttpError as error:
    # TODO(developer) - Handle errors from drive API.
    print(f"An error occurred: {error}")


if __name__ == "__main__":
  main()
