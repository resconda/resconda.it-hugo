import argparse
from dotenv import load_dotenv
load_dotenv()

# Import the Cloudinary libraries
# ==============================
import cloudinary
import cloudinary.uploader

# Import to format the JSON responses
# ==============================
import json

def uploadImage(image_uri):
  result = cloudinary.uploader.upload(image_uri, folder="assets/post-img", unique_filename = True, overwrite=False, use_filename=True)

  return result

# Set configuration parameter: return "https" URLs by setting secure=True  
# ==============================
config = cloudinary.config(secure=True)

if __name__ == "__main":
  parser = argparse.ArgumentParser()
  parser.add_argument("IMAGE", help="Path to local filesystem image to upload")

  args = parser.parse_args()
  result = uploadImage(args.IMAGE)

  print("Upload result: ", result)