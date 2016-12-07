angular.module('trail').controller('homeCtrl', function ($scope, $cordovaGeolocation, $ionicLoading, mainSvc) {
  var geo = $cordovaGeolocation.getCurrentPosition({ frequency: 3000, timeout: 5000, enableHighAccuracy: true});

  // $scope.gpsHomePing = function () {
  //   geo.then(function (position) {
  //       $scope.lat = position.coords.latitude;
  //       $scope.long = position.coords.longitude;
  //     },
  //     function error(err) {
  //       $scope.errors = err;
  //     }
  //   )
  // };

  $scope.updateWeather = function () {
    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });
    setTimeout(getWeather, 1000);
    setTimeout(getForecast, 1000);
    geo.then(function (position) {
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
        $scope.loading.hide();
      },
      function error(err) {
        $scope.errors = err;
      });

    mainSvc.getWeather($scope.lat, $scope.long).then(function (weatherObject) {
      $scope.weatherTemp = weatherObject.currentTemp;
      $scope.weatherDesc = weatherObject.currentDesc;
      $scope.weatherHum = weatherObject.currentHum;
      $scope.weatherSpeed = weatherObject.currentWindSpeed;
    });
    mainSvc.getForecast($scope.lat, $scope.long).then(function (forecastObject) {
      $scope.forecastTempHigh = forecastObject.tempHigh;
      $scope.forecastTempLow = forecastObject.tempLow;
      $scope.forecastTempHigh1 = forecastObject.tempHigh1;
      $scope.forecastTempLow1 = forecastObject.tempLow1;
      $scope.forecastDesc1 = forecastObject.desc1;
      $scope.forecastTempHigh2 = forecastObject.tempHigh2;
      $scope.forecastTempLow2 = forecastObject.tempLow2;
      $scope.forecastDesc2 = forecastObject.desc2;
    });
  };
});
