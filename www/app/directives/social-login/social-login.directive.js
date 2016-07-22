(function() {
    angular
        .module('patApp')
        .directive('socialLogin', socialLogin);

    function socialLogin() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/directives/social-login/social-login.html',
            controller: SocialLoginController,
            controllerAs: 'dvm',
            // bindToController: true
        };

        return directive;
    }

    SocialLoginController.$inject = ['$state', '$ionicLoading', '$cordovaOauth', '$http', '$localStorage', 'RESOURCES'];

    function SocialLoginController($state, $ionicLoading, $cordovaOauth, $http, $localStorage, RESOURCES) {
        var dvm = this;

        dvm.facebookLogin = function() {
          $ionicLoading.show({});
          $cordovaOauth.facebook(RESOURCES.FACEBOOK_ID, ["email"], {})
          .then(function(result) {
              console.log(result);
              var url = RESOURCES.API_URL + 'users/rest-auth/facebook/'
              var fbdata = {
                "access_token": result.access_token
              }
              return $http.post(url, fbdata)
          }, function(error) {
              $ionicLoading.hide({});
              console.log(JSON.stringify(error));
          })
          .then(function(response){
              $ionicLoading.hide({});
              $localStorage.token = response.data.key;
              $http.defaults.headers.common['Authorization'] = 'Token ' + response.data.key;
              $state.go('default.completesocial')
          }, function(error){
            $ionicLoading.hide({});
            console.log(error);
          });

        }

        dvm.googleLogin = function() {
          $ionicLoading.show({});

          $cordovaOauth.google("303760359301-oeemf28rrecl0bnffu96brlpnkom60r0.apps.googleusercontent.com", ["https://www.googleapis.com/auth/userinfo.email"])
          .then(function(result) {
              console.log(result);
              var url = RESOURCES.API_URL + 'users/rest-auth/google/'
              var fbdata = {
                "access_token": result.access_token
              }
              return $http.post(url, fbdata)
          }, function(error) {
              $ionicLoading.hide({});
              console.log(JSON.stringify(error));
          })
          .then(function(response){
              $ionicLoading.hide({});
              $localStorage.token = response.data.key;
              $http.defaults.headers.common['Authorization'] = 'Token ' + response.data.key;
              $state.go('default.completesocial')
          }, function(error){
            $ionicLoading.hide({});
            console.log(error);
          });
        }

    }

})();
