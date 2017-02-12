angular.module('trail').controller('userCtrl', function ($scope, $ionicPopup, mainSvc) {
console.log()
  $scope.showAlert = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Oops!',
      template: 'User Already Exists!',
    });
    alertPopup.then(function (res) {});
  };
})
