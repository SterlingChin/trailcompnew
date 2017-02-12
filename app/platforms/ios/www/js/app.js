angular.module('trail', ['ionic', 'ngCordova'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider){
  $ionicConfigProvider.scrolling.jsScrolling(false);
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tab.gps', {
    url: '/gps',
    views: {
      'tab-gps': {
        templateUrl: 'templates/tab-gps.html',
        controller: 'gpsCtrl'
      }
    }
  })

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'mapsCtrl'
      }
    }
  })

  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html',
      }
    }
  })

  .state('newuser', {
      url: '/user',
      templateUrl: 'templates/tab-user.html',
        controller:'userCtrl'
})

.state('usinggps', {
  url: '/usinggps',
  templateUrl: 'templates/tab-usinggps.html',
  controller: 'contentCtrl'
})

.state('yourdata', {
  url: '/yourdata',
  templateUrl: 'templates/tab-yourdata.html'
})

.state('aboutapp', {
  url: '/aboutapp',
  templateUrl: 'templates/aboutApp.html'
})

.state('thedevs', {
  url: '/thedevs',
  templateUrl: 'templates/tab-developer.html'
})

.state('mentors', {
  url: '/thementors',
  templateUrl: 'templates/mentors.html'
})

.state('mentors1', {
  url: '/thementors',
  templateUrl: 'templates/mentors1.html'
})

.state('mentors2', {
  url: '/thementors',
  templateUrl: 'templates/mentors2.html'
});

$urlRouterProvider.otherwise('/tab/dash');

});
