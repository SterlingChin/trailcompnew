angular.module('trail').service('mainSvc', function($http) {
  this.location = {};
  //  ______________________________________________________
  // |                                                      |
  // |                 Location Services                    |
  // |______________________________________________________|

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

  //  ______________________________________________________
  // |                                                      |
  // |            Current Weather Service                   |
  // |______________________________________________________|

  this.getWeather = function(lat, long) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + lat + '&lon=' + long + '&appid=93491e6dadbe8a2ac36dc3e3855f670a'
    }).then(function(response) {
      var weatherObject = {};
      if (response.status === 200) {
        weatherObject.temp = response.data.main.temp;
        weatherObject.desc = response.data.weather[0].description;
        weatherObject.hum = response.data.main.humidity;
        weatherObject.pressure = response.data.main.pressure;
        weatherObject.windSpeed = response.data.wind.speed;

        return weatherObject;
      }
      return "It's broken, sorry!";
    });
  };

  //  ______________________________________________________
  // |                                                      |
  // |             Weather Forecast Service                 |
  // |______________________________________________________|

  this.getForecast = function(lat, long) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&lat=' + lat + '&lon=' + long + '&cnt=7&APPID=93491e6dadbe8a2ac36dc3e3855f670a'
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
        forecastObject.tempHigh2 = data[2].temp.max;
        forecastObject.tempLow2 = data[2].temp.min;
        forecastObject.desc2 = data[2].weather[0].main;
        forecastObject.tempHigh3 = data[3].temp.max;
        forecastObject.tempLow3 = data[3].temp.min;
        forecastObject.desc3 = data[3].weather[0].main;
        console.log(forecastObject);
        return forecastObject;
      }
      return "It's broken, sorry! ";
    });
  };
});


//https://trailcompserver.herokuapp.com/start
