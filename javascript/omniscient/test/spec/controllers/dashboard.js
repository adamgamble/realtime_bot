'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('omniscientApp'));

  var dashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    dashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a title', function () {
    expect(scope.title).toBe("Dashboard");
  });
});
