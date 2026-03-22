#!/bin/bash

set -euo pipefail

# Build and run production Docker image
docker build -f docker/build.Dockerfile -t expressjs-template:latest .

# Start container
container_id=$(docker run -d -p 29000:8000 expressjs-template:latest)
trap "docker rm -f $container_id" EXIT

sleep 2

# Test endpoints
curl -fsS http://127.0.0.1:29000/v1/public > /dev/null
curl -fsS http://127.0.0.1:29000/v1/customer > /dev/null

# Test login and extract token from header and body
raw_headers=$(curl -isS http://127.0.0.1:29000/v1/auth/login)
if ! echo "$raw_headers" | grep -iq '^x-jwt-token:'; then
  echo "X-JWT-Token header was not returned"
  exit 1
fi

token=$(curl -fsS http://127.0.0.1:29000/v1/auth/login | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
if [ -z "$token" ]; then
  echo "JWT token not found in response"
  exit 1
fi

# Test private endpoint
curl -fsS -H "Authorization: Bearer ${token}" http://127.0.0.1:29000/v1/private > /dev/null

echo "All Docker+curl tests passed!"
