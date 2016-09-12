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
        btcPoolPrice: "=",
        btcContributorPrice: "=",
        btcRackPrice: "=",
        ethPoolPrice: "=",
        ethContributorPrice: "=",
        ethRackPrice: "=",
        btcPoolClick: "&",
        btcMachineClick: "&",
        btcRackClick: "&",
        ethPoolClick: "&",
        ethMachineClick: "&",
        ethRackClick: "&",
        btcPoolCalc: "&",
        btcContributorCalc: "&",
        btcRackCalc: "&",
        ethPoolCalc: "&",
        ethContributorCalc: "&",
        ethRackCalc: "&"
      }
    };
  });
