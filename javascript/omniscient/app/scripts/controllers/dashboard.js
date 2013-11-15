'use strict';

angular.module('omniscientApp')
  .controller('DashboardCtrl', ['$scope', '$websocketService', 'constants', function ($scope, $websocketService, constants) {

    $websocketService.start($scope, constants.websocketUri);
    $scope.title = "Dashboard";
    var isMessage = function(data){
      return angular.isDefined(data.username) && angular.isDefined(data.text);
    };
    $scope.$on('inboundMessage', function(evt, data){
      if(isMessage(data)){
        $scope.$apply(function(){
          $scope.messages.push(data);
        });
      }
      if(isUserList(data)){
        $scope.users = data.users;
      }
    });
  }]);
