#!/bin/bash
echo "Downloading https://github.com/punkrocker178/notes-vault"
curl -L -o notes-vault.zip https://github.com/punkrocker178/notes-vault/archive/main.zip

echo "Unzipping notes-vault"
unzip -d markdown/ notes-vault.zip
rm notes-vault.zip

echo "Removing old files"
rm -rf markdown/*

echo "Moving markdown files to markdown/ directory"
mv markdown/notes-vault-main/* markdown/
rm -rf markdown/notes-vault-main

echo "Preprocessing markdown files"
docker run -it --rm -v $PWD:/app -w /app node:22-alpine node preprocess-markdown-files.js

echo "Deploying to S3"
aws s3 sync config/.vitepress/dist/ s3://hiu-notes-bucket/ --delete
