#!/bin/sh

cd deploy
git init .
git add Dockerfile
git config --local user.email "bot@allies.co.in"
git config --local user.name "Build Bot"
git commit -m "Coinomia Build - $DRONE_BRANCH - $DRONE_COMMIT - $DRONE_BUILD_NUMBER"
git remote add dokku dokku@apps.appfactory.in:coinomia
git push dokku master --force
echo "$DRONE_BRANCH branchs pushed to Dokku"

rm -rf .git

