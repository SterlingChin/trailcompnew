// angular.module('starter').controller('mapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
//
//   console.log("Initializing map CTRL")
//
//     $ionicPlatform.ready(function() {
//
//        console.log("mapCtrl: Ionic platform ready")
//         $ionicLoading.show({
//             template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
//         });
//
//         var posOptions = {
//             enableHighAccuracy: true,
//             timeout: 20000,
//             maximumAge: 0
//         };
//
//         // $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
//             var lat  = 40.2262786//position.coords.latitude;
//             var long = -111.6607625//position.coords.longitude;
//
//             var myLatlng = new google.maps.LatLng(lat, long);
//
//             var mapOptions = {
//                 center: myLatlng,
//                 zoom: 16,
//                 mapTypeId: google.maps.MapTypeId.SATELLITE
//             };
//
//             var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//
//             $scope.map = map;
//             $ionicLoading.hide();
//
//         // }, function(err) {
//         //     $ionicLoading.hide();
//         //     console.log(err);
//         // });
//     }
//   );
// });
