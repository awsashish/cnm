'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:slider/btcPool
 * @description
 * # slider/btcPool
 */
angular.module('coinomiaFrontendApp')
  .directive('uiSlider', function ($filter) {
    var totalAmount = function() {

      var btcPool = parseInt(angular.element("#btc-0").val());
      var btcMachine = parseInt(angular.element("#btc-1").val());
      var btcRack = parseInt(angular.element("#btc-2").val());
      // var btcPool2 = parseInt(angular.element("#btc-3").val());
      // var btcMachine2 = parseInt(angular.element("#btc-4").val());
      // var btcRack2 = parseInt(angular.element("#btc-5").val());

      // ETH Value
      var ethPool = parseInt(angular.element("#eth-0").val());
      var ethMachine = parseInt(angular.element("#eth-1").val());
      var ethRack = parseInt(angular.element("#eth-2").val());

      //var btcTotal = btcPool + btcMachine + btcRack + btcPool2 + btcMachine2 + btcRack2;
      var btcTotal = btcPool + btcMachine + btcRack;
      var ethTotal = ethPool + ethMachine + ethRack;
      var total = btcTotal + ethTotal;
      if(total){
        var total = $filter('currency')(total);
        
        var totalAmount = '<strong>Total - '+total+'</strong>';
        angular.element(".total-price").html(totalAmount);
      }else{
        var totalAmount = '<strong>Total - $0.00</strong>';
        angular.element(".total-price").html(totalAmount);
      }
    }
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
                scope.btc.quantity = scope.btc.btcMining/scope.btc.miningpower;
                el.html(sliderLabel.replace('SLIDER_VALUE', scope.btc.btcMining));
              }
              else if (attrs.product === 'eth') {
                scope.eth.ethMining = ui.value;
                scope.eth.quantity = scope.eth.ethMining/scope.eth.miningpower;
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
          change: function() {
            totalAmount();
          }
        });

        if(attrs.product === 'btc') {
          scope.$watch('btc.btcMining', function(newVal) {
            $(elem).slider('value', newVal);
          });
          scope.$watch('btc.quantity', function(newVal) {
            $(elem).slider('value', scope.btc.btcMining);
            setTimeout(function() {
              totalAmount.call();
            }, 500)            
          });
        }
        else if(attrs.product === 'eth') {
          scope.$watch('eth.ethMining', function(newVal) {
            $(elem).slider('value', newVal);
          });
          scope.$watch('eth.quantity', function(newVal) {
            $(elem).slider('value', scope.eth.ethMining);
            setTimeout(function() {
              totalAmount.call();
            }, 500)            
          });
        }
      }
    };
  });
