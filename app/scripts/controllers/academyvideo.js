'use strict';

/**
 * @ngdoc function
 * @name coinomiaFrontendApp.controller:AcademyvideoCtrl
 * @description
 * # AcademyvideoCtrl
 * Controller of the coinomiaFrontendApp
 */
angular.module('coinomiaFrontendApp')
  .controller('AcademyvideoCtrl', function ($scope, config, coinomiaService) {
    $scope.s3Url = config.s3BucketUrl;

    $scope.submit = function(info) {
      var info = {
        "skypeid": info.skypeId,
        "mobile": info.contact,
        "question": info.question,
        "time_utc": info.timezone,
        "time_slot": info.timeslot
      }
      coinomiaService.academyContact(info)
        .then(function(res) {
          console.log('Thank You');
        });
    }
  });
