'use strict';

angular.module('omniscientApp')
  .controller('DashboardCtrl', ['$scope', '$websocketService', function ($scope, $websocketService) {
    $scope.title = "Dashboard";
    $scope.lidarData = {};

    $scope.$on('inbound:lidar', function(evt, data){
      $scope.$apply(function() {
        $scope.lidarData = data;
      });
    });

    $scope.$on('inbound:battery_voltage', function(evt, data){
      $scope.$apply(function() {
        $scope.batteryData = data;
      });
    });
  }]);
