'use strict';

angular.module('omniscientApp')
  .controller('DashboardCtrl', ['$scope', '$websocketService', function ($scope, $websocketService) {
    $scope.title = "Dashboard";
    $scope.lidarData = {};

    $scope.$on('inbound:lidar', function(evt, data){
      console.log("controller lidar data", data);
      $scope.lidarData = data;
    });

    $scope.$on('inbound:battery_voltage', function(evt, data){
      $scope.batteryData = data;
    });
  }]);
