#!/bin/bash

cd /app
echo "Running npm install..."
npm install -g --omit-dev
echo "Starting the application..."
node --env-file .env app.js