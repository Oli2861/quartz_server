# quartz_server
Builds HTML from markdown files using quartz and serves them using nginx.
Periodically checks the git repository specified in the docker environment variable (set in docker-compose.yml) for changes and re-builds if there are any. 