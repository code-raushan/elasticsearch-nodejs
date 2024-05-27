#!/bin/bash

# Pull the Kibana Docker image
docker pull docker.elastic.co/kibana/kibana:8.13.4

# Start a Kibana container
docker run --name kib01 --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.13.4

# When starting Kibana for the first time, it will output a unique link in the terminal
# Open that link in a web browser and enter the enrollment token from Elasticsearch

# Note: If you need to regenerate the Kibana enrollment token, run this in Shell 1
# docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana

# Log in to Kibana as the 'elastic' user with the password generated when you first started Elasticsearch