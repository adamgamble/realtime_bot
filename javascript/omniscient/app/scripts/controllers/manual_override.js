'use strict';

angular.module('omniscientApp')
  .controller('ManualOverrideCtrl', ['$scope', '$websocketService', function ($scope, $websocketService) {
    $scope.title = "Manual Override";
    $scope.remoteData = "";
    $scope.$on('inbound', function(evt, data){
      // stuff and things
    });
  }]);
