#!/bin/sh

DEPLOY_DIR=/tmp/deploy_$DRONE_BUILD_NUMBER
mkdir -p /tmp/deploy_$DRONE_BUILD_NUMBER
echo "FROM docker.appfactory.in/coinomia-frontend:latest" > $DEPLOY_DIR/Dockerfile
cd $DEPLOY_DIR
git init .
git config --local user.email "bot@allies.co.in"
git config --local user.name "Build Bot"
git commit -m "Coinomia Latest Build - $DRONE_BRANCH - $DRONE_COMMIT - $DRONE_BUILD_NUMBER"
git remote add dokku dokku@apps.appfactory.in:coinomia-latest
git push dokku master --force
echo "$DRONE_BRANCH pushed to Dokku"
cd /tmp
rm -rf $DEPLOY_DIR


