angular.module('trail').controller('gpsCtrl', function ($scope, $cordovaGeolocation, $interval, mainSvc) { 
// flag true  = tracking started
// flag false = tracking stopped
  var flag = false;
  $scope.button = "Start GPS Tracking";
  // var geoSettings = {
  //     frequency: 3000,
  //     timeout: 5000,
  //     enableHighAccuracy: true
  //   };
  // var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);
   var intervalPin = function() {
    $scope.setPoint();
  };

// |------------------------------------------------------|
// |                       GPS Ping                       |
// |------------------------------------------------------|

  $interval(function() {

    var geoSettings = {
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

    geo.then(function(position) {
        $scope.lat = mainSvc.location.lat = position.coords.latitude;
        $scope.long = mainSvc.location.long = position.coords.longitude;


      },
      function error(err) {
        $scope.errors = err;
      }
    );
  }, 1000);
 
  // $interval(function() {
  //   geo.then(function(position) {
  //       $scope.lat = mainSvc.location.lat = position.coords.latitude;
  //       $scope.long = mainSvc.location.long = position.coords.longitude;
  //     },
  //     function error(err) {
  //       $scope.errors = err;
  //     }
  //   );
  // }, 1000);

    $scope.gpsPing = function () {
    geo.then(function (position) {
        $scope.lat = mainSvc.location.lat = position.coords.latitude;
        $scope.long = mainSvc.location.long = position.coords.longitude;
      },
      function error(err) {
        $scope.errors = err;
      }
    )}; 
// |------------------------------------------------------|
// |                       GPS Core                       |
// |------------------------------------------------------|

  var gpsCore = function () {
    geo.then(function (position) {
        $scope.lat = mainSvc.location.lat = position.coords.latitude;
        $scope.long = mainSvc.location.long = position.coords.longitude;
      },
      function error(err) {
        $scope.errors = err;
      });
    $scope.setPoint();
  };

// |------------------------------------------------------|
// |             Start/Stop GPS Tracking                  |
// |------------------------------------------------------|

  $scope.startPoint = function () {
if(!flag){
    mainSvc.startGPS({
      lat: $scope.lat,
      long: $scope.long,
      start_point: true
    }).then(function (res) {});
    $scope.interval = setInterval(intervalPin, 5000); // 5 minute intervals = 300000; 10 minute intervals = 600000
  flag = true;
  $scope.button = "Stop GPS Tracking"
  } else {
        mainSvc.stopGPS({
      lat: $scope.lat,
      long: $scope.long,
      end_point: true
    }).then(function (res) {});
    clearInterval($scope.interval);
    flag = false;
    $scope.button = "Start GPS Tracking"
  };
  };

// |------------------------------------------------------|
// |                   Set Manual Pin                     |
// |------------------------------------------------------|
  $scope.setPoint = function () {
    mainSvc.setGPS({
      lat: $scope.lat,
      long: $scope.long,
    }).then(function (res) {});
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