(function() {
    angular
        .module('patApp')
        .directive('socialLogin', socialLogin);

    function socialLogin() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/directives/social-login/social-login.html',
            controller: SocialLoginController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    SocialLoginController.$inject = ['$state'];

    function SocialLoginController($state) {
        var vm = this;

        vm.facebookLogin = function() {
            Ionic.Auth.login('facebook', { 'remember': true }).then(
                function() {
                    $state.go('app.dashboard');
                },
                function(errors) {
                    console.log(errors);

                });
        }

        vm.googleLogin = function() {
            Ionic.Auth.login('google', { 'remember': true }).then(
                function() {
                    $state.go('app.dashboard');
                },
                function(errors) {
                    console.log(errors);

                });
        }

    }

})();
