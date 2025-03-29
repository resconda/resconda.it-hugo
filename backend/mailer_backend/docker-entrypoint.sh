#!/bin/bash

cd /app
npm install --production
node --env-file .env app.js