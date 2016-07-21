(function() {
    'use strict';
    angular.module('patApp').controller('SignupCtrl', SignupCtrl);
    SignupCtrl.$inject = ['$state', '$ionicPopup', '$ionicLoading', 'api'];

    function SignupCtrl($state, $ionicPopup, $ionicLoading, api) {
        var vm = this;

        vm.islogin = false;
        vm.posted = false;

        vm.signupData = {};


        //--------------------------------------------
        vm.signup = function() {
            $ionicLoading.show({});

            if (typeof(vm.user) == 'undefined') {
                vm.showAlert('Please fill username and password to proceed.');
                return false;
            }


            api.Signup(vm.user)
            .then(function(token) {
                $ionicLoading.hide({});
                $state.go('app.dashboard');
                console.log(token);
            }, function(errors) {
                $ionicLoading.hide({});
                console.log(errors);
                vm.showAlert(errors.data[Object.keys(errors.data)[0]]);
            });
        }; // end signup

        vm.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Warning Message',
                template: msg
            });
        };

    };
})();
