angular.module('trail').controller('gpsCtrl', function ($scope, $cordovaGeolocation, $ionicPopup, $interval, mainSvc) {
  var geo = $cordovaGeolocation.getCurrentPosition({
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    }),
    intervalPin = function () {
      $scope.setPoint();
    },
    flag = false;
  // flag true  = tracking started
  // flag false = tracking stopped

  $scope.button = "Start GPS Tracking";

  $interval(function () {
    geo.then(function (position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
      },
      function error(err) {
        $scope.errors = err;
      }
    );
  }, 1000);

  // |------------------------------------------------------|
  // |                       GPS Ping                       |
  // |------------------------------------------------------|

  $scope.gpsPing = function () {
    geo.then(function (position) {
        $scope.pingLat = position.coords.latitude;
        $scope.pingLong = position.coords.longitude;
      },
      function error(err) {
        $scope.errors = err;
      }
    );
    console.log('Working');
  };

  // |------------------------------------------------------|
  // |             Start/Stop GPS Tracking                  |
  // |------------------------------------------------------|

  $scope.startPoint = function () {
    if (!flag) {
      geo.then(function (position) {
          $scope.lat = position.coords.latitude;
          $scope.long = position.coords.longitude;
        },
        mainSvc.startGPS({
          lat: $scope.lat,
          long: $scope.long,
          start_point: true
        }).then(function (res) {}),
        function error(err) {
          $scope.errors = err;
        });
      $scope.interval = setInterval(intervalPin, 60000); // 5 minute intervals = 300000; 10 minute intervals = 600000
      flag = true;
      $scope.button = "Stop GPS Tracking"
    } else {
      geo.then(function (position) {
          $scope.lat = position.coords.latitude;
          $scope.long = position.coords.longitude;
        },
        mainSvc.stopGPS({
          lat: $scope.lat,
          long: $scope.long,
          end_point: true
        }).then(function (res) {}),
        function error(err) {
          $scope.errors = err;
        });
      clearInterval($scope.interval);
      flag = false;
      $scope.button = "Start GPS Tracking"
    };
  };

  // |------------------------------------------------------|
  // |                   Set Manual Pin                     |
  // |------------------------------------------------------|
  $scope.setPoint = function () {
    geo.then(function (position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
      },
      mainSvc.setGPS({
        lat: $scope.lat,
        long: $scope.long,
      }).then(function (res) {}),
      function error(err) {
        $scope.errors = err;
      });
  };
});

// |------------------------------------------------------|
// |               Old Reference Code                     |
// |------------------------------------------------------|


//This checks the gps every second.  There is no need for this to actually be working every second.  
//Inject (<$interval>) into the function if setting this code back up.

// $interval(function() {

//   var geoSettings = {
//     frequency: 3000,
//     timeout: 5000,
//     enableHighAccuracy: true
//   };

//   var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

//   geo.then(function(position) {
//       $scope.lat = mainSvc.location.lat = position.coords.latitude;
//       $scope.long = mainSvc.location.long = position.coords.longitude;
//       $scope.heading = position.coords.heading;
//       $scope.timestamp = position.timestamp;

//     },
//     function error(err) {
//       $scope.errors = err;
//     }
//   );
// }, 1000);
