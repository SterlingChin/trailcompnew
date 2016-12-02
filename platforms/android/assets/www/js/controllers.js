angular.module('starter.controllers', [])

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
})

.controller('gpsCtrl', ['$scope','$cordovaGeolocation','$interval',function ($scope,$cordovaGeolocation,$interval) {

    $interval(function(){

        var geoSettings = {frequency: 30000, timeout: 100000,enableHighAccuracy: false};

        var geo = $cordovaGeolocation.getCurrentPosition(geoSettings);

        geo.then(function (position) {

                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;

            },
            function error(err) {
                $scope.errors = err;
            }
        );
     },30000);

}]);
