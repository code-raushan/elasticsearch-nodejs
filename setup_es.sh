#!/bin/bash

# Step 1: Install Docker
# Visit the Docker website to install Docker for your environment
# Make sure to allocate at least 4GB of memory if using Docker Desktop

# Step 2: Create a new Docker network
if ! docker network ls | grep -q "elastic"; then
  echo "Creating 'elastic' network..."
  docker network create elastic
else
  echo "'elastic' network already exists."
fi

# Step 3: Pull the Elasticsearch Docker image
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.13.4

# Step 4: Start an Elasticsearch container
docker run --name es01 --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.13.4

# Step 5: Retrieve the elastic user password and enrollment token from the logs
echo "Make sure to copy the elastic user password and enrollment token from the container logs."

# Step 6: Copy SSL certificate from the container to the local machine
docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .

# Step 7: Make a REST API call to Elasticsearch to ensure the container is running
read -p "Enter the elastic user password: " ELASTIC_PASSWORD
curl --cacert http_ca.crt -u elastic:$ELASTIC_PASSWORD https://localhost:9200