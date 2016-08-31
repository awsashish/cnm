#!/bin/sh

BRANCH=$1
COMMIT=$2
DEPLOY_DIR=/tmp/deploy_$COMMIT

DOCKER_IMAGE="docker.appfactory.in/coinomia-frontend:$BRANCH"

#Make sure Dokku Host has latest image from registry
dokku registry:pull coinomia-$BRANCH $DOCKER_IMAGE

[ -d $DEPLOY_DIR ] && rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR
echo "FROM $DOCKER_IMAGE" > $DEPLOY_DIR/Dockerfile
cd $DEPLOY_DIR
git init .
git add Dockerfile
git config --local user.email "bot@allies.co.in"
git config --local user.name "Build Bot"
git commit -m "Coinomia $BRANCH - $COMMIT"
git remote add dokku dokku@apps.appfactory.in:coinomia-$BRANCH
git push dokku master --force
if [ $? -eq 0 ]; then
  echo "$BRANCH (commit: $COMMIT)  pushed to Dokku"
else
  echo "$BRANCH (commit: $COMMIT)  push to Dokku FAILED" >&2
  exit 1
fi
cd /tmp
rm -rf $DEPLOY_DIR
#dokku ps:restart coinomia-$BRANCH
