angular.module('trail', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
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
        templateUrl: 'templates/tab-map.html'
        // controller: 'mapsCtrl'
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
  
    .state('tab.user', {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/tab-user.html',
        controller:'userCtrl'
      }
    }
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

    .state('thedevs', {
    url: '/thedevs',
    templateUrl: 'templates/tab-developer.html'
    });
  //
  // .state('tab.chat-detail', {
  //   url: '/chats/:chatId',
  //   views: {
  //     'tab-chats': {
  //       templateUrl: 'templates/chat-detail.html',
  //       controller: 'ChatDetailCtrl'
  //     }
  //   }
  // })
  //
  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
