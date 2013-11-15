'use strict';

angular.module('omniscientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/override', {
        templateUrl: 'views/manual_override.html',
        controller: 'ManualOverrideCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
