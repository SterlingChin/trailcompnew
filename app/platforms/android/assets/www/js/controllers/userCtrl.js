angular.module('trail').controller('userCtrl', function ($scope, $ionicPopup, mainSvc) {

  $scope.showAlert = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Oops!',
      template: 'User Already Exists!',
    });
    alertPopup.then(function (res) {});
  };
})
