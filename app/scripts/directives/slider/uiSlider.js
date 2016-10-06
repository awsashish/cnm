'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:slider/btcPool
 * @description
 * # slider/btcPool
 */
angular.module('coinomiaFrontendApp')
  .directive('uiSlider', function () {
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
            });
          },
          create: function( event, ui ) {
            var el = angular.element(event.target).find('a');
            var sliderValue = $(elem).slider('value');
            el.append(sliderLabel.replace('SLIDER_VALUE', scope.model));
          }
        });
        scope.$watch('model', function(newVal) {
          $(elem).slider('value', newVal);
        });
      }
    };
  });
