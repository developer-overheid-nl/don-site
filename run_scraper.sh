#!/bin/bash

set -e

echo "🚀 Start Docker Compose..."
docker compose up -d

sleep 5

echo "Start DocSearch scraper..."
docker run -it --env-file=.env -e "CONFIG=$(cat typesense-config.json | jq -c .)" typesense/docsearch-scraper:0.11.0

echo "Scraper voltooid!"
