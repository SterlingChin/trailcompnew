angular.module('trail').controller('homeCtrl', function($scope, $cordovaGeolocation, mainSvc) {
//    $scope.gpsHomePing = function () {
//     var geoSettings = {
//       frequency: 3000,
//       timeout: 5000,
//       enableHighAccuracy: true
//     };

//     var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

//     geo.then(function (position) {
//         $scope.lat =  position.coords.latitude;
//         $scope.long = position.coords.longitude;

//       },
//       function error(err) {
//         $scope.errors = err;
//       }
//     );
//   };

 $scope.updateWeather = function(){
    $scope.gpsHomePing = function () {
    var geoSettings = {
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

    geo.then(function (position) {
        $scope.lat =  position.coords.latitude;
        $scope.long = position.coords.longitude;

      },
      function error(err) {
        $scope.errors = err;
      }
    );
  };
    mainSvc.getWeather($scope.lat, $scope.long).then(function(weatherObject) {
    // mainSvc.getWeather().then(function(weatherObject) {
        $scope.weatherTemp = weatherObject.currentTemp;
        $scope.weatherDesc = weatherObject.currentDesc;
        $scope.weatherHum = weatherObject.currentHum;
        $scope.weatherSpeed = weatherObject.currentWindSpeed;
    });
    mainSvc.getForecast($scope.lat, $scope.long).then(function(forecastObject) {        
    // mainSvc.getForecast().then(function(forecastObject) { 
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
