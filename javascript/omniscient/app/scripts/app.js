'use strict';

angular.module('omniscientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'ngAnimate-animate.css'
])
  .config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    // $locationProvider.html5Mode(false);
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
  }])
  .run(['$rootScope', '$websocketService', function ($rootScope, $websocketService) {
    // $websocketService.start($scope, constants.websocketUri);
    var websocketUri = "ws://" + document.domain + ":1234";
    $websocketService.start($rootScope, websocketUri)
  }])
  .value("constants", {
    websocketUri: "ws://" + document.domain + ":1234"
  });
