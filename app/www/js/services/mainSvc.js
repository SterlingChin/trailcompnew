angular.module('trail').service('mainSvc', function($http) {
  var location = {};

  // |------------------------------------------------------|
  // |                      GPS Service                     |
  // |------------------------------------------------------|
      this.gpsPingSvc = function () {
    //   $scope.loading = $ionicLoading.show({
    //   content: 'Getting current location...',
    //   showBackdrop: false
    // });
    var geoSettings = {
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

    geo.then(function (position) {
        location.lat = position.coords.latitude;
        location.long = position.coords.longitude;
        console.log(this.location);
        return location;
      },
      function error(err) {
        $scope.errors = err;
      });
    console.log('Working');
  }; 

  this.startGPS = function(startCoords) {
    // console.log(startCoords);
    return $http.post("https://trailcompserver.herokuapp.com/start", startCoords);
    // return $http.post('http://localhost:3000/start', startCoords);
  };
  this.setGPS = function(currentCoords) {
    return $http.post('https://trailcompserver.herokuapp.com/setgps', currentCoords);
    // return $http.post('http://localhost:3000/setgps', currentCoords);
  };
  this.stopGPS = function(endCoords) {
    return $http.post('https://trailcompserver.herokuapp.com/stop', endCoords);
    // return $http.post('http://localhost:3000/stop', endCoords);
  };

  // |------------------------------------------------------|
  // |               Current Weather Service                |
  // |------------------------------------------------------|

  this.getWeather = function(lat, long) {
    return $http({
      method: 'GET',
      // url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=40.22&lon=-111.66&APPID=e81bd2ae54609c9106d55df519afe223'
      url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + lat + '&lon=' + long + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a'
    }).then(function(response) {
      var weatherObject = {};
      if (response.status === 200) {
        weatherObject.currentTemp = response.data.main.temp;
        weatherObject.currentDesc = response.data.weather[0].main;
        weatherObject.currentHum = response.data.main.humidity;
        weatherObject.currentWindSpeed = response.data.wind.speed;
console.log(weatherObject);
        return weatherObject;
      }
      return "It's broken, sorry!";
    });
  };

  // |------------------------------------------------------|
  // |               Forecast Weather Service               |
  // |------------------------------------------------------|

  this.getForecast = function(lat, long) {
    return $http({
      method: 'GET',
      // url: 'http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&lat=40.22&lon=-111.66&cnt=3&APPID=e81bd2ae54609c9106d55df519afe223'
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&lat=' + lat + '&lon=' + long + '&cnt=3&APPID=e81bd2ae54609c9106d55df519afe223'
    }).then(function(response) {
      var forecastObject = {};
      var data = response.data.list;
      if (response.status === 200) {
        console.log(response.data);
        forecastObject.tempHigh = data[0].temp.max;
        forecastObject.tempLow = data[0].temp.min;
        forecastObject.tempHigh1 = data[1].temp.max;
        forecastObject.tempLow1 = data[1].temp.min;
        forecastObject.desc1 = data[1].weather[0].main;
        console.log(forecastObject);
        return forecastObject;
      }
      return "It's broken, sorry! ";
    });
  };


// |------------------------------------------------------|
// |                     Map Service                      |
// |------------------------------------------------------|



});
// |------------------------------------------------------|
// |                   Hardcode Data                      |
// |------------------------------------------------------|

//lat: 40.22622305
//long: -111.6608091