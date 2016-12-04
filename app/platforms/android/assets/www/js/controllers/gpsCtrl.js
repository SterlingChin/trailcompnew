angular.module('trail').controller('gpsCtrl', function($scope, $cordovaGeolocation, $interval, mainSvc) {
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
        $scope.heading = position.coords.heading;
        $scope.timestamp = position.timestamp;

      },
      function error(err) {
        $scope.errors = err;
      }
    );
  }, 1000);

  var intervalPin = function() {
    console.log('Working');
    $scope.setPoint();
  };
 
  // |------------------------------------------------------|
  // |                      GPS Points                      |
  // |------------------------------------------------------|

  $scope.startPoint = function() {
    mainSvc.startGPS({
      lat: $scope.lat,
      long: $scope.long,
      start_point: true
    }).then(function(res) {});
    $scope.interval = setInterval(intervalPin, 300000); //Interval set to 5 minutes
  };

  $scope.setPoint = function() {
    mainSvc.setGPS({
      lat: $scope.lat,
      long: $scope.long,
    }).then(function(res) {});
  };

  $scope.stopPoint = function() {
    mainSvc.stopGPS({
      lat: $scope.lat,
      long: $scope.long,
      end_point: true
    }).then(function(res) {});
    clearInterval($scope.interval);
  };
});
