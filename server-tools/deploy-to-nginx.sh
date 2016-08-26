#!/bin/sh

DRONE_JOB_NUMBER=$1
NGINX_DIR="/usr/share/nginx"
HTML_NEW_DIR="$NGINX_DIR/dist_$DRONE_JOB_NUMBER"

sudo cp -a /home/coinomia/deployments/dist_$DRONE_JOB_NUMBER/ $HTML_NEW_DIR/ && \
     rm $NGINX_DIR/html && \
     ln -s $HTML_NEW_DIR $NGINX_DIR/html
