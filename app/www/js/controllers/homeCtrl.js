angular.module('trail').controller('homeCtrl', function ($scope, $cordovaGeolocation, mainSvc) {
  var geo = $cordovaGeolocation.getCurrentPosition({
    frequency: 3000,
    timeout: 5000,
    enableHighAccuracy: true
  });

  $scope.updateWeather = function () {
    geo.then(function (position) {
        $scope.homeLat = position.coords.latitude;
        $scope.homeLong = position.coords.longitude;
        mainSvc.getWeather($scope.homeLat, $scope.homeLong).then(function (weatherObject) {
          $scope.weatherTemp = weatherObject.currentTemp;
          $scope.weatherDesc = weatherObject.currentDesc;
          $scope.weatherHum = weatherObject.currentHum;
          $scope.weatherSpeed = weatherObject.currentWindSpeed;
        });
        mainSvc.getForecast($scope.homeLat, $scope.homeLong).then(function (forecastObject) {
          $scope.forecastTempHigh = forecastObject.tempHigh;
          $scope.forecastTempLow = forecastObject.tempLow;
          $scope.forecastTempHigh1 = forecastObject.tempHigh1;
          $scope.forecastTempLow1 = forecastObject.tempLow1;
          $scope.forecastDesc1 = forecastObject.desc1;
          $scope.forecastTempHigh2 = forecastObject.tempHigh2;
          $scope.forecastTempLow2 = forecastObject.tempLow2;
          $scope.forecastDesc2 = forecastObject.desc2;
        });
      },
      function error(err) {
        $scope.errors = err;
      });
  };
});
