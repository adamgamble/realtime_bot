'use strict';

angular.module('omniscientApp')
  .factory('$websocketService', ['$window', function($window) {
    var topicName = 'inbound';
    var wsf = this.$get[1];
    var openInterval;

    var start = function (scope, websocketUri) {
      var socket = new WebSocket(websocketUri);
      socket.onopen = function() {
        console.log("socket opened...");
        scope.$broadcast("socketAvailable", true);
        scope.socketAvailable = true;
        $window.clearInterval(openInterval);
      };
      socket.onclose = function() {
        console.log("socket closed...");
        scope.$broadcast("socketAvailable", false);
        scope.socketAvailable = false;
      };
      socket.onmessage = function(message){
        scope.$broadcast(topicName, angular.fromJson(message.data));
      };

      scope.$on("outbound", function(evt, data) {
        if(socket.readyState === 1) {
          socket.send(data);
        }
      });
    };

    // pending
    function reconnect(scope, websocketUri, socket) {
      if(socket.readyState !== 0 || socket.readyState !== 1) {
        start(scope, websocketUri);
      }
    }

    return {
      start: start
    };
  }]);
