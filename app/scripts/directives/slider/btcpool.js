'use strict';

/**
 * @ngdoc directive
 * @name coinomiaFrontendApp.directive:slider/btcPool
 * @description
 * # slider/btcPool
 */
angular.module('coinomiaFrontendApp')
  .directive('btcPool', function () {
    return {
      restrict: 'A',
      scope: {
        'model': '='
      },
      link: function(scope, elem, attrs) {
        var sliderLabel  = '<label>SLIDER_VALUE<small>TH/s</small></label>';
        var uiLabelInner = '<div class="ui-slider-label-inner"></div>';
        $(elem).slider({
          value: +scope.model,
          min: +attrs.min,
          max: +attrs.max,
          step: +attrs.step,
          slide: function(event, ui) {
            scope.$apply(function() {
              scope.model = ui.value;
            });
          },
          create: function( event, ui ) {
            var el = angular.element(event.target).find('a');
            var sliderValue = $(elem).slider('value');
            el.append(sliderLabel.replace('SLIDER_VALUE', scope.model)+uiLabelInner);
          },
          change: function( event, ui ) {
            var el = angular.element(event.target).find('a');
            el.find('label').html(sliderLabel.replace('SLIDER_VALUE', scope.model));
          }
        });
        scope.$watch('model', function(newVal) {
          $(elem).slider('value', newVal);
        });
      }
    };
  });
