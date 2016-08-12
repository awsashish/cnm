'use strict';

angular.module('coinomiaFrontendApp')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    // Login page
    .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })

    // Sign up page
    .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
    })

    // Dashboard page
    .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
    });
}]);
