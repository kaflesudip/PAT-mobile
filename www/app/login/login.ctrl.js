(function() {
    'use strict';
    angular.module('patApp').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$location', '$ionicPopup'];

    function LoginCtrl($location, $ionicPopup) {
        var vm = this;

        vm.loginData = {};

        //--------------------------------------------
        vm.login = function(user) {

            if (typeof(user) == 'undefined') {
                vm.showAlert('Please fill username and password to proceed.');
                return false;
            }

            if (user.username == 'demo@gmail.com' && user.password == 'demo') {
                $location.path('/app/dashboard');
            } else {
                vm.showAlert('Invalid username or password.');
            }

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
