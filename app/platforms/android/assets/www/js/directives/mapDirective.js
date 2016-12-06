angular.module('trail').directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&',
      lat: "=",
      long: "="
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng($scope.lat, $scope.long),

          zoom: 16,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});