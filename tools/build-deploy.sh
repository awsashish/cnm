cd ../
npm install && bower install
grunt test
grunt build

cd ./tools/

cp -a ../dist ./dist
DOCKER_HOST=tcp://docker.appfactory.in:2376 docker build --no-cache=true -t docker.appfactory.in/coinomia-frontend:latest -f Dockerfile.image
DOCKER_HOST=tcp://docker.appfactory.in:2376 docker push docker.appfactory.in/coinomia-frontend:latest

rm -rf ./dist

cp Dockerfile.run ./deploy/Dockerfile

cd ./deploy/
git init .
git add .
git config --local user.email "bot@allies.co.in"
git config --local user.name "Build Bot"
git commit -m "Coinomia Build"
git remote add dokku dokku@apps.appfactory.in:coinomia
git push dokku master --force

rm -rf ./.git
rm Dockerfile
