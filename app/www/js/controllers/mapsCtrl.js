angular.module('trail').controller('mapsCtrl', function ($scope, $ionicLoading, mainSvc) {
  $scope.mapCreated = function (map) {
    $scope.map = map;
  };
  var geoSettings = {
      frequency: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };
var latLng = new google.maps.LatLng(40.22622305, -111.6608091);
  // $scope.getLocation = function () {
  //   $scope.location = mainSvc.gpsPingSvc();
  // }

  $scope.centerOnMe = function () {
  //   console.log("Centering");
  //   if (!$scope.map) {
  //     return;
  //   }

  //   $scope.loading = $ionicLoading.show({
  //     content: 'Getting current location...',
  //     showBackdrop: false
  //   });

  //   $cordovaGeolocation.getCurrentPosition(function (pos) {
  //     console.log('Got pos', pos);
  //     $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  //     $scope.loading.hide();
  //   }, function (error) {
  //     alert('Unable to get location: ' + error.message);
  //   });
  // };
  google.maps.event.addListenerOnce($scope.map, 'idle', function () {
    var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
    });

  });
};
});
