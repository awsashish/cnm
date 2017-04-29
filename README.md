# coinomia-frontend [![Build Status](https://drone.appfactory.in/api/badges/coinomia/coinomia-frontend/status.svg)](https://drone.appfactory.in/coinomia/coinomia-frontend)

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Project Requirement
npm version >= 3.10.8 and node version >= 6.9.1

## Steps of Installation

git clone git@bitbucket.org:coinomia/coinomia-frontend.git

cd coinomia-frontend

git checkout latest-code

npm install && bower install

grunt serve

Visit URL http://localhost:9000/ to see the site


## Server Configuration
 
 goto app/scripts/services/coinomiaservice.js
 
 goto line number 16 and update the below values

 $location.host() === 'login.coinomia.com' to $location.host() === 'YOUR_API_PATH'

 change `apiHost` value for both Live server and Staging server
 
 For Live Server
 
 this.apiHost = 'https://api.coinomia.com/' to this.apiHost = 'https://YOUR_LIVE_SERVER_API_PATH/'

 For Staging Server
 
 this.apiHost = 'https://api.coinomia.com/' to this.apiHost = 'https://YOUR_STAGING_SERVER_API_PATH/'

    

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


## Deployment process

cd to YOUR_PROJECT_DIRECTORY

grunt build

It will generate dist folder and move that folder on your server


# Continues Integration and Deployment

## Subheading




