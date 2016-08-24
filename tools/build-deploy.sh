cd ../
npm install && bower install
grunt test
grunt build

cd ./tools/
rm -rf ./deploy/dist/*
mkdir -p ./deploy/dist
cp -a ../dist/ ./deploy/dist/

cp Dockerfile.deploy.template ./deploy/dist/Dockerfile
cp Caddyfile.template ./deploy/dist/Caddyfile

DOCKER_HOST=tcp://docker.appfactory.in:2376 docker build -t --no-cache=true docker.appfactory.in/coinomia-frontend:latest deploy/dist
DOCKER_HOST=tcp://docker.appfactory.in:2376 docker push docker.appfactory.in/coinomia-frontend:latest

rm -rf ./deploy/dist

cp Dockerfile.template ./deploy/Dockerfile

cd ./deploy/
git init .
git add .
git commit -m "Coinomia Build"
git remote add dokku dokku@apps.appfactory.in:coinomia
git push dokku master --force

rm -rf ./.git
rm Dockerfile
