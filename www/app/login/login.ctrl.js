(function() {
    'use strict';
    angular.module('patApp').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$location', '$state', '$ionicPopup'];

    function LoginCtrl($location, $state, $ionicPopup) {
        var vm = this;
        vm.islogin = true;

        vm.loginData = {};

        //--------------------------------------------
        vm.login = function(user) {

            if (typeof(user) == 'undefined') {
                vm.showAlert('Please fill username and password to proceed.');
                return false;
            }

            var details = {
              'email': vm.user.email,
              'password': vm.user.password
            };

            Ionic.Auth.login('basic', {}, details).then(
              function(){
                $state.go('app.dashboard');
              }, function(){
                vm.showAlert('Invalid username or password.');
              }
            );

        };

        // An alert dialog
        vm.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Warning Message',
                template: msg
            });
        };

        //logout
        vm.logout = function() {   $location.path('/app/login');   };
    };
})();
