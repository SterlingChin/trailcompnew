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
  $scope.interval = function () {
    if (flag) {
      setTimeout(function () {
        intervalPin();
        $scope.interval();
      }, 10000);
    };
  }; // 5 minute intervals = 300000; 10 minute intervals = 600000

  $scope.button = "Start GPS Tracking";

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
          if (position.coords.latitude == null || position.coords.longitude == null) {
            $scope.startPoint();
          } else {
            // $scope.hikeName();
            $scope.lat = $scope.pinglat = position.coords.latitude;
            $scope.long = $scope.pingLong = position.coords.longitude;
            mainSvc.startGPS({
              lat: $scope.lat,
              long: $scope.long,
            }).then(function (res) {})
          };
        },
        function error(err) {
          $scope.errors = err;
        });
      flag = true;
      $scope.interval();
      $scope.gpsPing();
      $scope.button = "Stop GPS Tracking"
      $scope.hikeName();
    } else {
      geo.then(function (position) {
          $scope.lat = $scope.pinglat = position.coords.latitude;
          $scope.long = $scope.pingLong = position.coords.longitude;
        },
        mainSvc.stopGPS({
          lat: $scope.lat,
          long: $scope.long,
        }).then(function (res) {}),
        function error(err) {
          $scope.errors = err;
        });
      clearTimeout($scope.interval);
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

  // |------------------------------------------------------|
  // |                       PopUps                         |
  // |------------------------------------------------------|

  $scope.hikeName = function () {
    $scope.data = {}
    var trailName = $ionicPopup.show({
      template: '<input type = "text" ng-model = "data.trailName">',
      title: 'Name this Trail:',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function (e) {
          if (!$scope.data.trailName) {
            e.preventDefault();
          } else {
            return $scope.data.trailName;
          }
        }
      }]
    });
    trailName.then(function (res) {
    
      console.log('name', res);
    });
  };

  $scope.setPinName = function () {
    $scope.data = {}
    var setPinPopup = $ionicPopup.show({
      template: '<input type = "text" ng-model = "data.setPinName">',
      title: 'Name Pin?',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function (e) {
          if (!$scope.data.setPinName) {
            e.preventDefault();
          } else {
$scope.setPoint();
            return $scope.data.setPinName;
          }
        }
      }]
    });
    setPinPopup.then(function (res) {
      console.log('Tapped!', res);
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
