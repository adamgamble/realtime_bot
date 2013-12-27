'use strict';

angular.module('omniscientApp')
  .directive('battery', ['$window', '$interval', '$timeout', function ($window, $interval, $timeout) {
    return {
      templateUrl: 'templates/battery.html',
      restrict: 'E',
      scope: { 
        data: '=batteryData',
        type: '@batteryType',
        cssClass: '@batteryClass'
      },
      link: function($scope, element, attrs) {
      }
    };
  }]);
