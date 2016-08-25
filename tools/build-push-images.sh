#echo "Building coinomia-frontend:latest images"
#cp -a ../dist ./dist
#cp Dockerfile.image ./dist/Dockerfile
#DOCKER_HOST=tcp://docker.appfactory.in:2376 docker build --no-cache -t docker.appfactory.in/coinomia-frontend:latest dist
#DOCKER_HOST=tcp://docker.appfactory.in:2376 docker push docker.appfactory.in/coinomia-frontend:latest
#echo "docker.appfactory.in/coinomia-frontend:latest pushed to registry"
#rm -rf ./dist

#echo "Building image for Dokku"


rm -rf $DRONE_DIR/deploy/.git
cd $DRONE_DIR/deploy
git init .
git add .
git config --local user.email "bot@allies.co.in"
git config --local user.name "Build Bot"
git commit -m "Coinomia Build"
git remote add dokku dokku@apps.appfactory.in:coinomia
git push dokku master --force
echo "App pushed to Dokku"

rm -rf $DRONE_DIR/deploy/.git
