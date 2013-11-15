'use strict';

describe('Controller: ManualOverrideCtrl', function () {

  // load the controller's module
  beforeEach(module('omniscientApp'));

  var manualOverrideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    manualOverrideCtrl = $controller('ManualOverrideCtrl', {
      $scope: scope
    });
  }));

  it('should attach a title', function () {
    expect(scope.title).toBe("Manual Override");
  });
});
