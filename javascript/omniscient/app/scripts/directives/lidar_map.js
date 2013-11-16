'use strict';

angular.module('omniscientApp')
  .directive('lidarMap', ['$window', function ($window) {
    return {
      templateUrl: 'templates/lidar_map.html',
      restrict: 'E',
      scope: { 
        data: '=lidarData'
      },
      link: function postLink($scope, element, attrs) {
        var w = 500, h = 500;
        $scope.data = {
          "id": "A1",
          "rpm": 274,
          "points": [513, 533, 568, 0, 0, 0, 0, 0, 721, 0, 0, 0, 0, 0, 509, 490, 480, 473, 473, 474, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1229, 1223, 1231, 1240, 1248, 1255, 1265, 1277, 1327, 1337, 1388, 1367, 1351, 1323, 1321, 1332, 1338, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2456, 2386, 2040, 2349, 2319, 2302, 1960, 1949, 1907, 1903, 1886, 2199, 2152, 1939, 1676, 2120, 2119, 1602, 1591, 1585, 1637, 0, 1608, 1600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2148, 2164, 2182, 2205, 2212, 2230, 2250, 2266, 2293, 2306, 2328, 2309, 2369, 2419, 2454, 2488, 2495, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2235, 0, 0, 0, 0, 0, 0, 2186, 2158, 2208, 0, 2170, 2162, 2260, 2173, 2199, 2243, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 451, 292, 472, 560, 554, 549, 549, 552, 557, 571, 655, 663, 628, 636, 684, 692, 703, 713, 721, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 420, 405, 394, 379, 367, 355, 344, 333, 325, 319, 312, 306, 300, 296, 292, 288, 286, 284, 281, 278, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };

        $scope.$watch("data", function(newValue, oldValue) {
          if(newValue !== oldValue) {
            $scope.data = newValue;
          }
        });

        $scope.options = $scope.data.id + " - " + $scope.data.rpm + " RPM";

        //actual points to be plotted on the lidar map
        var d = [ $scope.data.points ];

        //Options for the Radar chart, other than default
        var mycfg = {
          w: w,
          h: h,
          maxValue: 0.6,
          levels: 6,
          extraWidthX: 190
        }

        var updateMap = function() {
          LidarMapper.draw("#lidar-map", d, mycfg);
        };
        updateMap();

        $scope.$on("inbound:lidar", function(evt, data) {
        });

        // demo to ensure outbound traffic works
        // TODO: move to test
        // $window.setInterval(function() {
        //   $scope.$broadcast("outbound", "1,3");
        // }, 1000);

        // var randomPoints = [];
        // $window.setInterval(function() {
        //   randomPoints = _.shuffle(lidarData.points);
        //   LidarMapper.draw("#lidar-map", [randomPoints], mycfg);
        // }, 1000);
      }
    };
  }]);
