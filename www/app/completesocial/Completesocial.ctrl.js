(function() {
    'use strict';
    angular.module('patApp').controller('CompletesocialCtrl', CompletesocialCtrl);
    CompletesocialCtrl.$inject = ['$ionicLoading', '$state', 'api' ];

    function CompletesocialCtrl($ionicLoading, $state, api) {
        var vm = this;

        $ionicLoading.show({});

        api.GetUserInfo()
            .then(function(response){
                $ionicLoading.hide({});
                console.log("socialres", response);
                if (response.data.is_full_profile){
                  $state.go('app.dashboard');
                }
            }, function(errors){
                console.log(errors);
                $ionicLoading.hide({});
            });

        vm.update = function() {
            $ionicLoading.show({});
            vm.user.is_full_profile = true;
            api.UpdateUser(vm.user)
                .then(function(token) {
                    $ionicLoading.hide({});
                    $state.go('app.dashboard');
                }, function(errors) {
                    $ionicLoading.hide({});
                    console.log(errors);
                });
        }; // end signup


    };
})();
