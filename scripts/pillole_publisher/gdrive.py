import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

from tempfile import NamedTemporaryFile, TemporaryDirectory
from io import FileIO
import argparse

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]


class MultipleResultsException(Exception):
  pass

class NoResultsException(Exception):
  pass

def authenticate(credentialsfile, tokenfile):
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists(tokenfile):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          credentialsfile, SCOPES
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())

  return creds

def rescondaComunicazioneSharedDriveId(creds):
  service = build("drive", "v3", credentials=creds)
  results = service.drives().list(q="name = 'COMUNICAZIONE'").execute()
  items = results.get("drives", [])
  if len(items) == 0:
    raise NoResultsException("Could not find shared drive 'COMUNICAZIONE'")
  if len(items) > 1:
    raise MultipleResultsException("Found more than one shared drive 'COMUNICAZIONE'")
  return items[0]["id"]

def getDriveFile(pillole_gdocx, creds): 
  service = build("drive", "v3", credentials=creds)
  driveid = rescondaComunicazioneSharedDriveId(creds)
  results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"name contains '{pillole_gdocx}'", fields="files(id,name,parents)").execute()
  items = results.get("files", [])
  if len(items) == 0:
    raise NoResultsException(f"Could not find file '{pillole_gdocx}'")
  if len(items) > 1:
    raise MultipleResultsException(f"Found more than one file '{pillole_gdocx}'")
  return items[0]

def fetchPilloleDocxMdx(pillole_gdocx, creds):
  the_file = getDriveFile(pillole_gdocx, creds)
  service = build("drive", "v3", credentials=creds)
  request = service.files().export(fileId=the_file["id"], mimeType="text/markdown")
  tmpfile = NamedTemporaryFile()
  downloader = MediaIoBaseDownload(tmpfile, request, chunksize=1024*1024)
  done = False
  print(f"Downloading Markdown-exported {pillole_gdocx}...")
  while done is False:
    status, done = downloader.next_chunk()
  print(f"Done")
  
  return tmpfile.name

def fetchImmagini(pillole_gdocx, creds):
  '''
  Scarica le immagini dalla cartella IMMAGINI sorella del file pillole_gdocx. I file vengono scaricati in una cartella temporanea, che viene ritornata.
  '''
  driveid = rescondaComunicazioneSharedDriveId(creds)
  the_file = getDriveFile(pillole_gdocx, creds)
  service = build("drive", "v3", credentials=creds)
  parents = the_file["parents"]
  if len(parents) != 1:
    raise Exception(f"File {pillole_gdocx} has {len(parents)} parents, expected 1")
  parentid = parents[0]["id"]
  results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"'{pId}' in parents and name = 'IMMAGINI'").execute()
  items = results.get("files", [])
  if len(items) == 0:
    raise NoResultsException("Could not find folder IMMAGINI")
  if len(items) > 1:
    raise MultipleResultsException("Found more than one folder IMMAGINI")
  the_folder = items[0]
  results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"'{the_folder['id']}' in parents", fields="files(id,name)").execute()
  items = results.get("files", [])
  tmpdir = TemporaryDirectory()
  for item in items:
    print(f"Downloading image {item['name']}...")
    request = service.files().get_media(fileId=item["id"])
    tmpfile = os.path.join(tmpdir.name, item["name"])
    downloader = MediaIoBaseDownload(tmpfile, request, chunksize=1024*1024)
    done = False
    while done is False:
      status, done = downloader.next_chunk()
    print(f"Done")
  return tmpdir.name
  
def main(args):
  creds = authenticate(args.creds, args.token)
  pillole_docx_mdx = fetchPilloleDocxMdx(args.PILLOLE_GDOCX, creds)
  print(f"pillole_docx_mdx: {pillole_docx_mdx}")
  immagini_dir = fetchImmagini(args.PILLOLE_GDOCX, creds)
  print(f"immagini_dir: {immagini_dir}")
  

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("PILLOLE_GDOCX", help="The name of the 'pillole' Google Docx file to fetch")
  parser.add_argument("-c","--creds", help="The path to the credentials file to use", default="credentials.json")
  parser.add_argument("-t","--token", help="The path to the token JSON file to use", default="token.json")

  args = parser.parse_args()
  main(args)