(function() {
    'use strict';
    angular.module('patApp').controller('SignupCtrl', SignupCtrl);
    SignupCtrl.$inject = ['$state', '$ionicPopup'];

    function SignupCtrl($state, $ionicPopup) {
        var vm = this;

        vm.islogin = false;

        vm.signupData = {};

        //--------------------------------------------
        vm.signup = function() {

            if (typeof(vm.user) == 'undefined') {
                vm.showAlert('Please fill username and password to proceed.');
                return false;
            }


            var details = {
                'email': vm.user.email,
                'password': vm.user.password,
                'custom': vm.custom
            };

            console.log(details);

            Ionic.Auth.signup(details).then(
                function() {
                    console.log("Signup");
                    Ionic.Auth.login('basic', {}, details).then(
                        function() {
                            $state.go('app.dashboard');
                        },
                        function() {
                            vm.showAlert('Invalid username or password.');
                        }
                    );

                },
                function(errors) {
                    errorText = "";
                    for (err in errors){
                        console.log("error", err, errors[err]);
                        errorText += errors[err] + ' ';
                    }
                    console.log("Error", errorText);
                    vm.showAlert(errorText);
                });

        };

        // An alert dialog
        vm.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Warning Message',
                template: msg
            });
        };

    };
})();
