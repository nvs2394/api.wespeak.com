#!/usr/bin/env bash

export IMAGE_NAME="${REPO_NAME:-api-v1}:${REPO_TAG:-latest}"
docker-compose -f 'docker-compose.test.yml' -p ci up --build --abort-on-container-exit
exit $(docker wait ci_hapi-starter-kit_1)


