angular.module('trail').controller('homeCtrl', function($scope, mainSvc, $interval) {
    $scope.test = "This is working Sterling.  Don't worry about it.";
 $scope.updateWeather = function(){
    // mainSvc.getWeather(mainSvc.location.lat, mainSvc.location.long).then(function(weatherObject) {
    mainSvc.getWeather().then(function(weatherObject) {
        $scope.weatherTemp = weatherObject.currentTemp;
        $scope.weatherDesc = weatherObject.currentDesc;
        $scope.weatherHum = weatherObject.currentHum;
        $scope.weatherSpeed = weatherObject.currentWindSpeed;
    });
    // mainSvc.getForecast(mainSvc.location.lat, mainSvc.location.long).then(function(forecastObject) {        
    mainSvc.getForecast().then(function(forecastObject) { 
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
