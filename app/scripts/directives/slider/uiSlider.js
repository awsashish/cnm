'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:slider/btcPool
 * @description
 * # slider/btcPool
 */
angular.module('coinomiaFrontendApp')
  .directive('uiSlider', function ($filter) {
    return {
      restrict: 'A',
      scope: {
        'model': '=',
        'product': '='
      },
      link: function(scope, elem, attrs) {
        if(scope.product === 'btc'){
          var sliderLabel  = '<label>SLIDER_VALUE<small>TH/s</small></label><div class="ui-slider-label-inner"></div>';
        }else{
          var sliderLabel  = '<label>SLIDER_VALUE<small>MH/s</small></label><div class="ui-slider-label-inner"></div>';
        }
        $(elem).slider({
          range: "min",
          animate: true,
          value: 1,
          min: +attrs.min,
          max: +attrs.max,
          step: +attrs.step,
          slide: function(event, ui) {
            scope.$apply(function() {
              scope.model = ui.value;
              var el = angular.element(event.target).find('a');
              el.html(sliderLabel.replace('SLIDER_VALUE', scope.model));
              // scope.updateAmount({amount:attrs.amount, power:attrs.power, mining:attrs.mining});
            });
          },
          create: function( event, ui ) {
            var el = angular.element(event.target).find('a');
            var sliderValue = $(elem).slider('value');
            el.append(sliderLabel.replace('SLIDER_VALUE', scope.model));
          },
          change: function( event, ui ) {
            var btcPool = parseInt(angular.element("#btc-0").val());
            var btcMachine = parseInt(angular.element("#btc-1").val());
            var btcRack = parseInt(angular.element("#btc-2").val());

            // ETH Value
            var ethPool = parseInt(angular.element("#eth-0").val());
            var ethMachine = parseInt(angular.element("#eth-1").val());
            var ethRack = parseInt(angular.element("#eth-2").val());

            scope.btcTotal = btcPool + btcMachine + btcRack;
            scope.ethTotal = ethPool + ethMachine + ethRack;
            scope.total = scope.btcTotal + scope.ethTotal;

            if(scope.total){
              var total = $filter('currency')(scope.total);
              var totalAmount = '<strong>Total -'+total+'</strong>';
              angular.element(".total-price").html(totalAmount);
            }

          }
        });
        scope.$watch('model', function(newVal) {
          $(elem).slider('value', newVal);
        });
      }
    };
  });
