#!/usr/bin/env bash

# Build and Deploy Script for PersonalWebsite

set -e  # Exit on error
npm run build -- --base=/~avni/
git add .
git commit -m "Deploying updated site: $(git diff --cached --name-only | tr '\n' ',' | sed 's/,$//')" || echo "No changes to commit"

# Deploy using rsync over SSH
# The -avz flags: archive mode, verbose, compress
# --delete removes files on server that don't exist locally
echo "Starting deployment to server..."
rsync -avz --delete --progress \
  dist/ \
    avni-CS:~/public/html/
echo "Deployment completed successfully."