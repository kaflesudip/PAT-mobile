// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('patApp', ['ionic','ionic.service.core', 'starter.controllers' , 'starter.services'])

.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
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

  .state('default', {
      url: '/default',
      abstract: true,
      templateUrl: 'app/default/default.html',
      // controller: 'DefaultCtl',
      // controllerAs: 'vm'
  })

//--------------------------------------

 .state('default.login', {
    url: '/login:signup',
    views: {
      'menuContent': {
        templateUrl: 'app/login/tab-signin.html'
      }
    }
  })
 .state('default.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'app/signup/tab-signup.html',
      }
   }
  })

  .state('default.tos', {
    url: '/tos',
    views: {
      'menuContent': {
        templateUrl: 'app/tos/tos.html',
      }
   }
  })
//--------------------------------------

   .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
		controller: 'DashboardCtrl'
      }
     }
  })


    .state('app.profiles', {
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: 'templates/profiles.html',
          controller: 'ProfilesCtrl'
        }
      }
    })

  .state('app.profile', {
    url: '/profile/:profileId',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/default/signup');
});
