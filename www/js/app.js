// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('patApp', ['ionic','ionic.service.core', 'starter.controllers' , 'starter.services', 'ngCordovaOauth', 'ngStorage', 'ngCordova'])

.run(function($ionicPlatform , $rootScope, $timeout, $localStorage, $http, $state) {
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

    if (typeof $localStorage.token != 'undefined'){
      $http.defaults.headers.common['Authorization'] = 'Token ' + $localStorage.token;
      $state.go('app.activity');
    }

  });

})

.constant('RESOURCES',{
      // API_URL: 'http://ec2-52-91-71-216.compute-1.amazonaws.com/',
      API_URL: 'http://192.168.100.2:8000/',
      FACEBOOK_ID : "1736760026576740",
      GOOGLE_ID: "303760359301-oeemf28rrecl0bnffu96brlpnkom60r0.apps.googleusercontent.com"

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

 .state('default.completesocial', {
    url: '/completesocial',
    views: {
      'menuContent': {
        templateUrl: 'app/completesocial/completesocial.html',
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
      templateUrl: 'app/menu/menu.html',

  })

  .state('app.activity', {
    url: '/activity',
    views: {
      'menuContent': {
        templateUrl: 'app/activity/activity.html',
      }
     }
  })

  .state('app.complete', {
    url: '/complete',
    views: {
      'menuContent': {
        templateUrl: 'app/activity/activity_complete.html',
      }
     }
  })
  ;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/default/signup');
});
