'use strict';

angular.module('omniscientApp')
  .directive('remoteControl', ['$rootScope', function ($rootScope) {
    return {
      templateUrl: 'templates/remote_control.html',
      restrict: 'E',
      scope: { 
        data: '=remoteData'
      },
      link: function postLink($scope, element, attrs) {
        $scope.socketDisabled = true;
        angular.element("h4", element.parent()).text("Manual Override Unavailable");

        // start in idle 'mode'
        $scope.controlLeft = "64";
        $scope.controlRight = "192";

        var commenceDisabling = function(socketAvailable) {
          if(socketAvailable) {
            angular.element("h4", element.parent()).text("Commence Manual Override");
            $scope.socketDisabled = false;
          } else {
            angular.element("h4", element.parent()).text("Manual Override Unavailable");
            $scope.socketDisabled = true;
          }
        };

        // swipe events
        // TODO: verify swipe events work, get start/stop events working
        angular.element("#controlLeft", element).bind("swipe", function(evt) {
          angular.element("pre", element).text("controlLeft swiping");
        });
        angular.element("#controlRight", element).bind("swipe", function(evt) {
          angular.element("pre", element).text("controlRight swiping");
        });

        // alert of unavailable socket
        $scope.$on("socketAvailable", function(evt, socketAvailable) {
          commenceDisabling(socketAvailable);
        });
        $rootScope.$watch("socketAvailable", function(newValue, oldValue) {
          commenceDisabling(newValue);
        });

        // send right and left control values
        $scope.$watch("controlLeft", function(newValue, oldValue) {
          if(newValue !== oldValue) {
            $scope.$emit("outbound", $scope.controlLeft + "," + $scope.controlRight);
          }
        });
        $scope.$watch("controlRight", function(newValue, oldValue) {
          if(newValue !== oldValue) {
            $scope.$emit("outbound", $scope.controlLeft + "," + $scope.controlRight);
          }
        });

        // var getPointerEvent = function(event) {
        //   // can give you the event type
        //   return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
        // };

        // // handle mouse changing events
        // // TODO: add touch events
        // $left.on("touchstart change touchmove", function(evt) {
        //   evt.preventDefault();
        //   lv = evt.target.value;
        //   rv = $right.val();

        //   app.send(lv + "," + rv);
        //   $out.text(lv + ", " + rv);
        // });
        // $right.on("touchstart change touchmove", function(evt) {
        //   evt.preventDefault();
        //   rv = evt.target.value;
        //   lv = $left.val();

        //   app.send(lv + "," + rv);
        //   $out.text(lv + ", " + rv);
        // });

        // // handle mouseup event (done with click and slide)
        // $left.on("mouseup keyup touchend touchleave touchcancel", function(evt) {
        //   $left.val(64);
        //   lv = $left.val();
        //   rv = $right.val();

        //   app.send(lv + "," + rv);
        //   $out.text(lv + ", " + rv);
        // });
        // $right.on("mouseup keyup touchend touchleave touchcancel", function(evt) {
        //   lv = $left.val();
        //   $right.val(192);
        //   rv = $right.val();

        //   app.send(lv + "," + rv);
        //   $out.text(lv + ", " + rv);
        // });

        // $(document).on("keydown", function(evt) {
        //   switch(evt.keyCode) {
        //     case 70: //left up
        //       if(lv > 0 && gv < 128) {
        //         lv = Number(gv) + 1;
        //       }
        //       $left.val(lv);
        //       break;
        //     case 82: //left down
        //       if(lv > 0 && gv < 128) {
        //         lv = Number(gv) - 1;
        //       }
        //       $left.val(lv);
        //       break;
        //     case 74: //right up
        //       if(rv > 127 && tv < 256) {
        //         rv = Number(tv) + 1;
        //       }
        //       $right.val(rv);
        //       break;
        //     case 85: //right down
        //       if(rv > 127 && tv < 256) {
        //         rv = Number(tv) - 1;
        //       }
        //       $right.val(rv);
        //       break;
        //     default:
        //       break;
        //   }
        //   app.send(lv + "," + rv);
        //   $out.text(lv + ", " + rv);
        // });

        // // keep sending current range values
        // window.setInterval(function() {
        //   lv = $left.val();
        //   rv = $right.val();
        //   app.send(lv + "," + rv);
        // }, 250);
      }
    };
  }]);
