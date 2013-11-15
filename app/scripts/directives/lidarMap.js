'use strict';

angular.module('realtimeBotApp')
  .directive('lidarMap', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the lidarMap directive');
      }
    };
  });
