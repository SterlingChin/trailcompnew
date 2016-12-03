angular.module('mainCtrl', [])

.controller('homeCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

// .controller('gpsCtrl', ['$scope', '$cordovaGeolocation', '$interval', function($scope, $cordovaGeolocation, $interval) {
//   $interval(function() {
//
//     var geoSettings = {
//       frequency: 3000,
//       timeout: 5000,
//       enableHighAccuracy: true
//     };
//
//     var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);
//
//     geo.then(function(position) {
//         $scope.latitude = position.coords.latitude;
//         $scope.longitude = position.coords.longitude;
//         $scope.altitude = position.coords.altitude;
//         $scope.heading = position.coords.heading;
//         $scope.timestamp = position.timestamp;
//
//       },
//       function error(err) {
// $scope.errors = err;
// }
//     );
//   }, 1000);
//
// }])

// .controller('mapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
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
//             var lat  = 49.2262786//position.coords.latitude;
//             var long = -111.6607625//position.coords.longitude;
//
//             var myLatlng = new google.maps.LatLng(lat, long);
//
//             var mapOptions = {
//                 center: myLatlng,
//                 zoom: 16,
//                 mapTypeId: google.maps.MapTypeId.ROADMAP
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
