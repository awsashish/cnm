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
      // scope: {
      //   'model': '=',
      //   'product': '='
      // },
      scope: '@',
      link: function(scope, elem, attrs) {
        if('undefined' != typeof scope.btc && scope.btc.coin.toLowerCase() === 'btc'){
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
              var el = angular.element(event.target).find('a');
              if(attrs.product === 'btc') {
                scope.btc.btcMining = ui.value;
                el.html(sliderLabel.replace('SLIDER_VALUE', scope.btc.btcMining));
              }
              else if (attrs.product === 'eth') {
                scope.eth.ethMining = ui.value;
                el.html(sliderLabel.replace('SLIDER_VALUE', scope.eth.ethMining));
              }
            });
          },
          create: function( event, ui ) {
            var el = angular.element(event.target).find('a');
            var sliderValue = $(elem).slider('value');
            if(attrs.product === 'btc') {
              el.append(sliderLabel.replace('SLIDER_VALUE', scope.btc.btcMining));
            }
            else if (attrs.product === 'eth') {
              el.append(sliderLabel.replace('SLIDER_VALUE', scope.eth.ethMining));
            }
            
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
              var totalAmount = '<strong>Total - '+total+'</strong>';
              angular.element(".total-price").html(totalAmount);
            }else{
              var totalAmount = '<strong>Total - $0.00</strong>';
              angular.element(".total-price").html(totalAmount);
            }

          }
        });

        if(attrs.product === 'btc') {
          scope.$watch('btc.btcMining', function(newVal) {
            $(elem).slider('value', newVal);
          });
        }
        else if(attrs.product === 'eth') {
          scope.$watch('eth.ethMining', function(newVal) {
            $(elem).slider('value', newVal);
          });
        }
      }
    };
  });
