'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:miningPayout
 * @description
 * # miningPayout
 */
angular.module('coinomiaFrontendApp')
  .directive('miningPayout', function () {
    return {
      restrict: 'A',
      templateUrl: 'views/directiveTemplates/miningPayouts.html',
      scope: {
        poolOptions: "=",
        machineOptions: "=",
        rackOptions: "=",
        btcPoolValue: "=",
        btcMachineValue: "=",
        btcRackValue: "=",
        ethPoolValue: "=",
        ethMachineValue: "=",
        ethRackValue: "=",
        dashPoolValue: "=",
        dashMachineValue: "=",
        dashRackValue: "=",
        poolDetails: "=",
        contributorDetails: "=",
        rackDetails: "=",
        currentMining: "=",
        btcPoolContract: "=",
        btcContributorContract: "=",
        btcRackContract: "=",
        ethPoolContract: "=",
        ethContributorContract: "=",
        ethRackContract: "=",
        dashPoolContract: "=",
        dashContributorContract: "=",
        dashRackContract: "=",
        btcPoolPrice: "=",
        btcContributorPrice: "=",
        btcRackPrice: "=",
        ethPoolPrice: "=",
        ethContributorPrice: "=",
        ethRackPrice: "=",
        dashPoolPrice: "=",
        dashContributorPrice: "=",
        dashRackPrice: "=",
        btcPoolClick: "&",
        btcMachineClick: "&",
        btcRackClick: "&",
        ethPoolClick: "&",
        ethMachineClick: "&",
        ethRackClick: "&",
        dashPoolClick: "&",
        dashMachineClick: "&",
        dashRackClick: "&",
        btcPoolCalc: "&",
        btcContributorCalc: "&",
        btcRackCalc: "&",
        ethPoolCalc: "&",
        ethContributorCalc: "&",
        ethRackCalc: "&",
        dashPoolCalc: "&",
        dashContributorCalc: "&",
        dashRackCalc: "&",
        s3Url:"="
      }
    };
  });
