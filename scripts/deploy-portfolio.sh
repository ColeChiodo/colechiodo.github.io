#!/bin/bash
set -e

# Optionally set this in ~/.bashrc to override the compose file location:
#   export DEPLOY_COMPOSE_FILE=~/path/to/docker-compose.yml

echo "Pulling latest image..."
docker pull colechiodo/portfolio:latest

echo "Recreating container..."
docker compose -f "${DEPLOY_COMPOSE_FILE:-~/scripts/docker-compose.yml}" up -d --force-recreate

echo "Cleaning up old images..."
docker image prune -f

echo "Deploy complete!"
