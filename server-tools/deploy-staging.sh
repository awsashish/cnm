#!/bin/sh

DEPLOY_TYPE=$1
BRANCH=$2
COMMIT=$3
DEPLOY_DIR=/tmp/deploy_$DEPLOY_TYPE

DOCKER_IMAGE="docker.appfactory.in/coinomia-frontend:$DEPLOY_TYPE"

#Make sure Dokku Host has latest image from registry
dokku registry:pull coinomia-$DEPLOY_TYPE $DOCKER_IMAGE

mkdir -p $DEPLOY_DIR
echo "FROM $DOCKER_IMAGE" > $DEPLOY_DIR/Dockerfile
cd $DEPLOY_DIR
git init .
git add Dockerfile
git config --local user.email "bot@allies.co.in"
git config --local user.name "Build Bot"
git commit -m "Coinomia $DEPLOY_TYPE - $BRANCH - $COMMIT"
git remote add dokku dokku@apps.appfactory.in:coinomia-$DEPLOY_TYPE
git push dokku master --force
echo "$DEPLOY_TYPE - $BRANCH (commit: $COMMIT)  pushed to Dokku"
cd /tmp
rm -rf $DEPLOY_DIR
