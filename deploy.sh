#!/bin/bash
S3_BUCKET=hiu-notes-bucket
CONFIG_DIR=config/.vitepress/dist/

echo "Downloading https://github.com/punkrocker178/notes-vault"
curl -L -o notes-vault.zip https://github.com/punkrocker178/notes-vault/archive/main.zip

echo "Removing old files"
rm -rf markdown/notes-vault-main

echo "Unzipping notes-vault"
unzip -d markdown/ notes-vault.zip
rm notes-vault.zip

echo "Preprocessing markdown files"
docker run -it --rm -v $PWD:/app -w /app node:22-alpine npm run preprocess-markdown

echo "Building pages"
# Check if npm contains vitepress to install
if ! docker run -it --rm -v $PWD:/app -w /app node:22-alpine sh -c "npm ls vitepress"; then
  echo "Installing vitepress"
  docker run -it --rm -v $PWD:/app -w /app node:22-alpine sh -c "npm install vitepress"
fi
docker run -it --rm -v $PWD:/app -w /app node:22-alpine sh -c "npm run docs:build"

echo "Deploying to S3"
aws s3 sync $CONFIG_DIR s3://$S3_BUCKET/ --delete
