(function() {
    'use strict';
    angular.module('patApp').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$location', '$state', '$ionicPopup', '$ionicLoading'];

    function LoginCtrl($location, $state, $ionicPopup, $ionicLoading) {
        var vm = this;
        // console.log("login ctrl is called");
        vm.islogin = true;

        vm.loginData = {};

        //--------------------------------------------
        vm.login = function(user) {

            $ionicLoading.show({});
            if (typeof(user) == 'undefined') {
              $ionicLoading.hide({});
                vm.showAlert('Please fill username and password to proceed.');
                return false;
            }

            var details = {
              'email': vm.user.email,
              'password': vm.user.password
            };

            Ionic.Auth.login('basic', {}, details).then(
              function(){
                $ionicLoading.hide();
                $state.go('app.dashboard');
              }, function(){
                $ionicLoading.hide();
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
