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

    SocialLoginController.$inject = ['$state', '$ionicLoading'];

    function SocialLoginController($state, $ionicLoading) {
        var dvm = this;

        dvm.facebookLogin = function() {
          $ionicLoading.show({});
            Ionic.Auth.login('facebook', { 'remember': true }).then(
                function() {
                $ionicLoading.hide();

                    $state.go('app.dashboard');
                },
                function(errors) {
                    console.log(errors);

                });
        }

        dvm.googleLogin = function() {
          $ionicLoading.show({});

            Ionic.Auth.login('google', { 'remember': true }).then(
                function() {
                $ionicLoading.hide();

                    $state.go('app.dashboard');
                },
                function(errors) {
                    console.log(errors);

                });
        }

    }

})();
