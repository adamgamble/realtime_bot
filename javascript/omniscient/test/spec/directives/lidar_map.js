'use strict';

describe('Directive: lidarMap', function () {
  var element, scope, $q, $timeout;

  // load the directive's module
  beforeEach(function() {
    module('omniscientApp', 'templates');
  });

  beforeEach(function(){
    inject(function($injector) {
      $q = $injector.get('$q');
      $timeout = $injector.get('$timeout');
    });
  });

  beforeEach(function() {
    inject(function($compile, $rootScope) {
      scope = $rootScope;
      element = angular.element("<lidar-map></lidar-map>");
      $compile(element)(scope);
      scope.$digest();
    });
  });

  it('should set the lidar map title', function ($compile) {
    scope.$apply(function() {
      scope.options = "Foobar";
    });
    expect(angular.element("h4", element).text()).toBe('Foobar');
  });
});
