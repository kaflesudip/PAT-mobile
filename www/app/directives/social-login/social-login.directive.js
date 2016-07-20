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

    SocialLoginController.$inject = ['$state', '$ionicLoading', '$cordovaOauth'];

    function SocialLoginController($state, $ionicLoading, $cordovaOauth) {
        var dvm = this;

        dvm.facebookLogin = function() {
          $ionicLoading.show({});
          $cordovaOauth.facebook("1736760026576740", ["email"], {})
          .then(function(result) {
              console.log(JSON.stringify(result));
              console.log(result);
          }, function(error) {
              console.log(JSON.stringify(error));
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
