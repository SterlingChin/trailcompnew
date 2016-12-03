angular.module('trail').service('mainSvc', function($http){
this.startGPS = function(startCoords){
  return $http.post("https://trailcompserver.herokuapp.com/start", startCoords);
};
});
