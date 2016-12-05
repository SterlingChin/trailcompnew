angular.module('trail').controller('gpsCtrl', function ($scope, $cordovaGeolocation, $ionicPopup, mainSvc) {
  
// |------------------------------------------------------|
// |                      GPS Ping                        |
// |------------------------------------------------------|

  $scope.gpsPing = function () {
    var geoSettings = {
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

    geo.then(function (position) {
        $scope.lat = mainSvc.location.lat = position.coords.latitude;
        $scope.long = mainSvc.location.long = position.coords.longitude;
        // $scope.heading = position.coords.heading;  <---Not currently a feature
        // $scope.timestamp = position.timestamp;  <----Not currently a feature

      },
      function error(err) {
        $scope.errors = err;
      }
    );
  };

// |------------------------------------------------------|
// |                  GPS Tracking Core                   |
// |------------------------------------------------------|

  var intervalPin = function () {
    $scope.setPoint();
    var geoSettings = {
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

    geo.then(function (position) {
        $scope.lat = mainSvc.location.lat = position.coords.latitude;
        $scope.long = mainSvc.location.long = position.coords.longitude;
        $scope.heading = position.coords.heading;
        $scope.timestamp = position.timestamp;

      },
      function error(err) {
        $scope.errors = err;
      }
    );
    console.log('Working');
  };

// |------------------------------------------------------|
// |                Start GPS Tracking                    |
// |------------------------------------------------------|

  $scope.startPoint = function () {
    mainSvc.startGPS({
      lat: $scope.lat,
      long: $scope.long,
      start_point: true
    }).then(function (res) {});
    $scope.interval = setInterval(intervalPin, 300000); // 5 minute intervals = 300000; 10 minute intervals = 600000
  };

// |------------------------------------------------------|
// |                    Set GPS Ping                      |
// |------------------------------------------------------|
  $scope.setPoint = function () {
    mainSvc.setGPS({
      lat: $scope.lat,
      long: $scope.long,
    }).then(function (res) {});
  };

// |------------------------------------------------------|
// |                  End GPS Tracking                    |
// |------------------------------------------------------|

  $scope.stopPoint = function () {
    mainSvc.stopGPS({
      lat: $scope.lat,
      long: $scope.long,
      end_point: true
    }).then(function (res) {});
    clearInterval($scope.interval);
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