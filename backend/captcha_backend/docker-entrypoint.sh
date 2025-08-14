#!/bin/sh

cd /app
echo "Running npm install..."
npm install --omit-dev
echo "Starting the application..."
node --env-file .env app.js