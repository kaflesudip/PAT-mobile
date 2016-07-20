(function() {
    'use strict';
    angular.module('patApp').controller('SignupCtrl', SignupCtrl);
    SignupCtrl.$inject = ['$state', '$ionicPopup', '$ionicLoading'];

    function SignupCtrl($state, $ionicPopup, $ionicLoading) {
        Ionic.Auth.logout();
        var vm = this;
        vm.ionicUser = null;

        vm.islogin = false;
        vm.posted = false;

        vm.signupData = {};

        var errorsDict = {
            "required_email": "Missing E-mail field",
            "required_password": "Missing Password field",
            "conflict_email": "A User has already signed up with the supplied e-mail. Please login instead.",
            "conflict_username": "A User has already signed up with the supplied username.",
            "invalid_email": "The e-mail did not pass validation."
        };

        //--------------------------------------------
        vm.signup = function() {
            $ionicLoading.show({});

            if (typeof(vm.user) == 'undefined') {
                vm.showAlert('Please fill username and password to proceed.');
                return false;
            }


            var details = {
                'email': vm.user.email,
                'password': vm.user.password,
                'custom': vm.custom
            };

            Ionic.Auth.signup(details) // if signup completes
            .then(function(newuser) {
                $ionicLoading.hide({});
                var user = Ionic.User.current();
                // console.log(user);
                // console.log(user.isAuthenticated());
                $state.go('default.login', {'signup': true});
            }, function(errors) {
                console.log("error1", errors, errors.length)
                $ionicLoading.hide({});
                for (var i = 0; i < errors.errors.length; i++) {
                    vm.showAlert(errorsDict[errors.errors[i]]);
                }
            });

        }; // end signup

        // An alert dialog
        vm.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Warning Message',
                template: msg
            });
        };

    };
})();
