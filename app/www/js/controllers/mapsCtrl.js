angular.module('trail').controller('mapsCtrl', function($scope, $cordovaGeolocation, mainSvc){

    var geoSettings = {
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    $cordovaGeolocation.getCurrentPosition(geoSettings).then(function (position) {
      var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var mapOptions = {
        center: currentLocation,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };
      $scope.map = new google.maps.Map(dicument.getElementById('map'), mapOptions);
    },
      function error(err) {
        $scope.errors = err;
      }
    );

});