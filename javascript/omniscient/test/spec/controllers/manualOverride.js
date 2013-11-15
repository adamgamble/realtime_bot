'use strict';

describe('Controller: ManualoverrideCtrl', function () {

  // load the controller's module
  beforeEach(module('omniscientApp'));

  var ManualoverrideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManualoverrideCtrl = $controller('ManualoverrideCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
