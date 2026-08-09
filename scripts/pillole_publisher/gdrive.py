import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

from tempfile import NamedTemporaryFile, TemporaryDirectory
from io import open as fopen
from shutil import rmtree, move, copytree
from os import makedirs
import argparse

from cldnry import uploadImage
from json import dump as jdump

ROOT = os.path.dirname(os.path.abspath(__file__))
# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]


class MultipleResultsException(Exception):
  pass

class NoResultsException(Exception):
  pass

def authenticate(credentialsfile, tokenfile):
  creds = None
  # The file `tokenfile` stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists(tokenfile):
    creds = Credentials.from_authorized_user_file(tokenfile, SCOPES)
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
    with fopen(tokenfile, "w") as token:
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
  results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"name contains '{pillole_gdocx}' and mimeType = 'application/vnd.google-apps.document'", fields="files(id,name,parents)").execute()
  items = results.get("files", [])
  if len(items) == 0:
    raise NoResultsException(f"Could not find file '{pillole_gdocx}'")
  if len(items) > 1:
    stritems = ",".join([f"({item['name']}, {item['id']})" for item in items])
    raise MultipleResultsException(f"Found more than one file '{pillole_gdocx}': {stritems}")
  return items[0]

def fetchPilloleDocxMdx(pillole_gdocx, creds):
  the_file = getDriveFile(pillole_gdocx, creds)
  service = build("drive", "v3", credentials=creds)
  request = service.files().export(fileId=the_file["id"], mimeType="text/markdown")
  tmpfile = NamedTemporaryFile(delete=False)
  downloader = MediaIoBaseDownload(tmpfile, request, chunksize=1024*1024)
  done = False
  print(f"Downloading Markdown-exported {pillole_gdocx}...")
  while done is False:
    status, done = downloader.next_chunk()
  print(f"Done")
  
  dest = 
  return tmpfile.name

def fetchImages(pillole_gdocx, creds):
  '''
  Scarica le immagini dalla cartella IMMAGINI sorella del file pillole_gdocx. I file vengono scaricati in una cartella temporanea, che viene ritornata.
  '''
  driveid = rescondaComunicazioneSharedDriveId(creds)
  the_file = getDriveFile(pillole_gdocx, creds)
  service = build("drive", "v3", credentials=creds)
  parents = the_file["parents"]
  if len(parents) != 1:
    raise Exception(f"File {pillole_gdocx} has {len(parents)} parents, expected 1")
  parentid = parents[0]
  results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"'{parentid}' in parents and name = 'IMMAGINI'").execute()
  items = results.get("files", [])
  if len(items) == 0:
    raise NoResultsException("Could not find folder IMMAGINI")
  if len(items) > 1:
    raise MultipleResultsException("Found more than one folder IMMAGINI")
  the_folder = items[0]

  # Get IMMAGINI folder contents
  results = service.files().list(driveId=driveid, corpora="drive", includeItemsFromAllDrives=True, supportsAllDrives=True, q=f"'{the_folder['id']}' in parents", fields="files(id,name)").execute()
  items = results.get("files", [])
  tmpdir = TemporaryDirectory(delete=True)
  drive_to_cloudinary = {}
  for item in items:
    print(f"Downloading image {item['name']}...")
    request = service.files().get_media(fileId=item["id"])
    tmpfile = os.path.join(tmpdir.name, item["name"])
    with fopen(tmpfile, "wb") as f:
      downloader = MediaIoBaseDownload(f, request, chunksize=1024*1024)
      done = False
      while done is False:
        status, done = downloader.next_chunk()
      result = uploadImage(tmpfile)
      drive_to_cloudinary[item['name']] = result["public_id"]
  return drive_to_cloudinary
  
def main(args):
  creds = authenticate(args.creds, args.token)
  builddir = args.outdir
  rmtree(builddir, ignore_errors=True)
  makedirs(builddir, exist_ok=False)
  pillole_docx_md = fetchPilloleDocxMdx(args.PILLOLE_GDOC, creds)
  dest = os.path.join(builddir, args.PILLOLE_GDOC + ".md")
  move(pillole_docx_md, dest)
  print(f"pillole_docx_md downloaded to: {dest}")
  d2c_map = fetchImages(args.PILLOLE_GDOC, creds)
  print(f"Images uploaded to cloudinary.")
  # write the map to a file
  dest = os.path.join(builddir, "d2c_map.json")
  with open(dest, "w") as f:
    jdump(d2c_map, f)
  print(f"Drive-to-cloudinary map written to: {dest}")


if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("PILLOLE_GDOC", help="The name of the 'pillole' Google Docx file to fetch")
  parser.add_argument("-c","--creds", help="The path to the credentials file to use", default=os.path.join(ROOT, "credentials.json"))
  parser.add_argument("-t","--token", help="The path to the token JSON file to use", default=os.path.join(ROOT, "token.json"))
  parser.add_argument("-o", "--outdir", default=os.path.join(ROOT, "build"))

  args = parser.parse_args()
  main(args)