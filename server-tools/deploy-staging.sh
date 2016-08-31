#!/bin/sh

BRANCH=$1
COMMIT=$2

#Docker Image to be pulled from private registry
DOCKER_IMAGE="docker.appfactory.in/coinomia-frontend:$BRANCH"
#Dokku APP name
DOKKU_APP=coinomia-$BRANCH

#Pull latest images from registry
docker pull $DOCKER_IMAGE
#Tag image as per Dokku's specs for image-deployment
docker tag $DOCKER_IMAGE dokku/$DOKKU_APP:$COMMIT

#Check if app exists
dokku ps $DOKKU_APP 2> /dev/null

#If app doesn't exist, create one
if [ $? -ne 0 ]; then
  dokku apps:create $DOKKU_APP
fi

#Deploy tag to app
dokku tags:deploy $DOKKU_APP $COMMIT
