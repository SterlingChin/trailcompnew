angular.module('trail').service('mainSvc', function($http) {
  var location = {};

  // |------------------------------------------------------|
  // |                      GPS Service                     |
  // |------------------------------------------------------|

  this.startGPS = function(currentCoords) {
    var startObj = {lat: parseFloat(currentCoords.lat),
      long: parseFloat(currentCoords.long),
      start_point: true,
      end_point: false
    };
console.log(startObj);
    return $http.post("https://trailcompserver.herokuapp.com/start", startObj);
    // return $http.post('http://localhost:3000/start', startCoords);
  };

  this.setGPS = function(currentCoords) {
    var setObj = {lat: parseFloat(currentCoords.lat),
      long: parseFloat(currentCoords.long),
      // manual_pin: $scope.data.setPinName,
      start_point: false,
      end_point: false
    };
    console.log(setObj)
    return $http.post('https://trailcompserver.herokuapp.com/setgps', setObj);
    // return $http.post('http://localhost:3000/setgps', currentCoords);
  };

  this.stopGPS = function(currentCoords) {
        var stopObj = {lat: parseFloat(currentCoords.lat),
      long: parseFloat(currentCoords.long),
      start_point: false,
      end_point: true
    };
    console.log(stopObj)
    return $http.post('https://trailcompserver.herokuapp.com/stop', stopObj);
    // return $http.post('http://localhost:3000/stop', endCoords);
  };

  this.hikeName = function(hikeName) {
    var trailName = { hike_name: hikeName,
    };
    console.log(trailName)
    return $http.post('https://trailcompserver.herokuapp.com/hikeName', trailName);
    // return $http.post('http://localhost:3000/setgps', currentCoords);
  };
  // |------------------------------------------------------|
  // |               Current Weather Service                |
  // |------------------------------------------------------|

  this.getWeather = function(lat, long) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=40.22&lon=-111.66&APPID=4c175e9132fa4abe35a8498d5504a8e0'
      // url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + lat + '&lon=' + long + '&APPID=4c175e9132fa4abe35a8498d5504a8e0'
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
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&lat=40.22&lon=-111.66&cnt=3&APPID=4c175e9132fa4abe35a8498d5504a8e0'
      // url: 'http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&lat=' + lat + '&lon=' + long + '&cnt=3&APPID=4c175e9132fa4abe35a8498d5504a8e0'
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
// |                     New User DB                      |
// |------------------------------------------------------|

//   this.newUser = function(newUser) {
//     var newUserObj = {
//       username:
//       first_name:
//       last_name:
//       email:
//       address:
//       city:
//       state:
//       zip:
//       phone:
//     };
// console.log(startObj);
//     return $http.post("https://trailcompserver.herokuapp.com/start", newUserObj);
//     // return $http.post('http://localhost:3000/start', startCoords);
//   };

});
// |------------------------------------------------------|
// |                   Hardcode Data                      |
// |------------------------------------------------------|

//lat: 40.22622305
//long: -111.6608091