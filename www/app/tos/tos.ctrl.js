(function() {
    'use strict';
    angular.module('patApp').controller('TosCtrl', TosCtrl);
    TosCtrl.$inject = ['$state', '$ionicLoading', 'api',];

    function TosCtrl($state, $ionicLoading, api) {
        var vm = this;

        vm.postTos= function(){
            $ionicLoading.show({});
            api.UpdateUser(vm.data)
            .then(function(response){
                $ionicLoading.hide({});
                $state.go('app.dashboard');
            },
            function(error){
                $ionicLoading.hide({});
                console.log(error);
            });
        }

    }
})();
