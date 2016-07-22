(function() {
    'use strict';
    angular.module('patApp').controller('LoginCtrl', LoginCtrl);
    LoginCtrl.$inject = ['$location', '$state', '$ionicPopup', '$ionicLoading', '$q', 'api'];

    function LoginCtrl($location, $state, $ionicPopup, $ionicLoading, $q, api) {
        var vm = this;


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

            api.Login(vm.user)
                .then(function(token) {
                    return api.GetUserInfo();
                }, function(errors) {
                    $ionicLoading.hide({});
                    console.log(errors);
                    vm.showAlert(errors.data[Object.keys(errors.data)[0]]);
                    $q.reject(errors);
                })
                .then(function(data){
                  $ionicLoading.hide({});
                  $state.go('app.dashboard')
                }, function(error){
                  $ionicLoading.hide({});
                  console.log(errors);
                });

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
