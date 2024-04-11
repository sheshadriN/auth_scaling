#!/bin/bash

# Define the directory to watch
WATCH_DIR=./src

# Run Docker Compose down, build, and run when changes occur
nodemon --watch $WATCH_DIR --exec "docker-compose down && docker-compose build && docker-compose up " --ext js
