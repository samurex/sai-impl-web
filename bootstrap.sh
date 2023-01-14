#!/usr/bin/env sh

# Update the client redirect urls
envsubst < /usr/share/nginx/html/assets/id.template.jsonld > /usr/share/nginx/html/assets/id.jsonld

# Update the env vars from the application reads from
envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

# Start the web server
nginx -g "daemon off;"
