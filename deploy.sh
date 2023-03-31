#!/bin/sh
# fetch-and-deploy.sh
docker compose -f docker-compose.prod.yml down && \
    docker compose -f docker-compose.prod.yml pull && \
    GATEWAY_PORT=5000 docker compose -f docker-compose.prod.yml up -d;