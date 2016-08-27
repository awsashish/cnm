#!/bin/sh
#
DRONE_JOB_NUMBER=$1
COMMIT=$2
NGINX_DIR="/usr/share/nginx"
HTML_NEW_DIR=" /home/coinomia/deployments/dev/dist_$DRONE_JOB_NUMBER"
echo "commit: $COMMIT" > $HTML_NEW_DIR/commit.txt

#sudo cp -a /home/coinomia/deployments/dist_$DRONE_JOB_NUMBER/ $HTML_NEW_DIR/ && \
#     rm $NGINX_DIR/html && \
#     ln -s $HTML_NEW_DIR $NGINX_DIR/html

sudo rm $NGINX_DIR/html_dev && \
     ln -s $HTML_NEW_DIR $NGINX_DIR/html_dev
