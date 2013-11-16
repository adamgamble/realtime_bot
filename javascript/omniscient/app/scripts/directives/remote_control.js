'use strict';

angular.module('omniscientApp')
  .directive('remoteControl', ['$rootScope', '$window', function ($rootScope, $window) {
    return {
      templateUrl: 'templates/remote_control.html',
      restrict: 'E',
      scope: { 
        data: '=remoteData'
      },
      link: function postLink($scope, element, attrs) {
        $scope.socketDisabled = true;
        angular.element("h4", element.parent()).text("Unavailable").addClass("disabled");

        var $left = angular.element("#controlLeft", element);
        var $right = angular.element("#controlRight", element);

        // start in idle 'mode'
        $scope.controlLeft = "64";
        $scope.controlRight = "192";

        var commenceDisabling = function(socketAvailable) {
          if(socketAvailable) {
            angular.element("h3", element.parent()).removeClass("disabled").text("Override Activated");
            $scope.socketDisabled = false;
          } else {
            angular.element("h3", element.parent()).addClass("disabled").text("Unavailable");
            $scope.socketDisabled = true;
          }
        };

        var commencePublishing = function(evt) {
          $scope.$emit("outbound", $scope.controlLeft + "," + $scope.controlRight);
          evt.preventDefault();
        };

        // alert of unavailable socket
        $scope.$on("socketAvailable", function(evt, socketAvailable) {
          commenceDisabling(socketAvailable);
        });
        $rootScope.$watch("socketAvailable", function(newValue, oldValue) {
          commenceDisabling(newValue);
        });

        // handle touch/mouse changing events
        $left.on("touchstart change touchmove", function(evt) {
          commencePublishing(evt);
        });
        $right.on("touchstart change touchmove", function(evt) {
          commencePublishing(evt);
        });

        // handle mouseup event (done with click and slide)
        $left.on("mouseup touchend touchleave touchcancel", function(evt) {
          //TODO is $apply still needed?
          $scope.$apply(function() {
            $scope.controlLeft = 64;
            $scope.$emit("outbound", $scope.controlLeft + "," + $scope.controlRight);
          });
        });
        $right.on("mouseup touchend touchleave touchcancel", function(evt) {
          //TODO is $apply still needed?
          $scope.$apply(function() {
            $scope.controlRight = 192;
            $scope.$emit("outbound", $scope.controlLeft + "," + $scope.controlRight);
          });
        });

        // keep sending current range values
        $window.setInterval(function() {
          // $scope.$emit("outbound", $scope.controlLeft + "," + $scope.controlRight);
        }, 250);
      }
    };
  }]);
