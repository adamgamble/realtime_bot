'use strict';

angular.module('omniscientApp')
  .factory('$websocketService', [function() {
    var topicName = 'inbound';

    return {
      start: function(scope, websocketUrl) {
        var socket = new WebSocket(websocketUrl);
        socket.onmessage = function(message){
          scope.$broadcast(topicName, angular.fromJson(message.data));
        };

        scope.$on("outbound", function(evt, data) {
          socket.send(data);
        });
      }
    };
  }]);
