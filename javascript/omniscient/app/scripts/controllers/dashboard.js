'use strict';

angular.module('omniscientApp')
  .controller('DashboardCtrl', ['$scope', '$websocketService', function ($scope, $websocketService) {
    $scope.title = "Dashboard";
    $scope.lidarData = {};
    $scope.$on('inbound', function(evt, data){
      $scope.lidarData = data;
    });
  }]);
