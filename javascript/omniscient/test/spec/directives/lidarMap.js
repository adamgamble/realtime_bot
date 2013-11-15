'use strict';

describe('Directive: lidarMap', function () {

  // load the directive's module
  beforeEach(module('omniscientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<lidar-map></lidar-map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the lidarMap directive');
  }));
});
