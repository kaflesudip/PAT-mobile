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

    SocialLoginController.$inject = ['$state', '$ionicLoading', '$cordovaOauth', '$http'];

    function SocialLoginController($state, $ionicLoading, $cordovaOauth, $http) {
        var dvm = this;

        dvm.facebookLogin = function() {
          $ionicLoading.show({});
          $cordovaOauth.facebook("1736760026576740", ["email"], {})
          .then(function(result) {
              console.log(result);
              var url = 'http://192.168.100.2:8000/users/rest-auth/facebook/'
              var fbdata = {
                "access_token": result.access_token
              }
              return $http.post(url, fbdata)
          }, function(error) {
              console.log(JSON.stringify(error));
          })
          .then(function(response){
            console.log(response);
            console.log(response.headers('Set-Cookie'))
          }, function(error){
            console.log(error);
          });

        }

        dvm.googleLogin = function() {
          $ionicLoading.show({});

          $cordovaOauth.google("303760359301-oeemf28rrecl0bnffu96brlpnkom60r0.apps.googleusercontent.com", ["https://www.googleapis.com/auth/userinfo.email"])
          .then(function(result) {
              console.log(JSON.stringify(result));
              console.log(result);
          }, function(error) {
              console.log(error);
          });
        }

    }

})();
