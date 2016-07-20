(function() {
    'use strict';
    angular.module('patApp').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$location', '$state', '$ionicPopup', '$ionicLoading', '$stateParams'];

    function LoginCtrl($location, $state, $ionicPopup, $ionicLoading, $stateParams) {
        var vm = this;


        vm.islogin = true;

        vm.loginData = {};

        //--------------------------------------------
        vm.login = function(userlogin) {

            $ionicLoading.show({});
            if (typeof(userlogin) == 'undefined') {
              $ionicLoading.hide({});
                vm.showAlert('Please fill username and password to proceed.');
                return false;
            }

            var details = {
              'email': vm.userlogin.email,
              'password': vm.userlogin.password
            };

            Ionic.Auth.login('basic', {'remember': true}, details).then(
              function(loggeduser){
                console.log("logged in");
                $ionicLoading.hide();
                $state.go('app.dashboard');
              }, function(error){
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

        if ($stateParams.signup){
          vm.showAlert("Signup successful. Please login to continue.");
        };

        //logout
        vm.logout = function() {   $location.path('/app/login');   };
    };
})();
