#!/bin/bash
set -e

source "$HOME/.bashrc_local"

COMPOSE_FILE="$PORTFOLIO_DEPLOY_COMPOSE_FILE"

echo "Using compose file: $COMPOSE_FILE"

docker compose -f "$COMPOSE_FILE" pull
docker compose -f "$COMPOSE_FILE" up -d --force-recreate
docker image prune -f

