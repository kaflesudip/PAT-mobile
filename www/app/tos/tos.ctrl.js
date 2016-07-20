(function() {
    'use strict';
    angular.module('patApp').controller('TosCtrl', TosCtrl);
    TosCtrl.$inject = ['$state', '$ionicLoading', 'api',];

    function TosCtrl($state, $ionicLoading, api) {
        var vm = this;

        vm.postTos= function(){
            $ionicLoading.show({});
            var user = Ionic.User.current();
            api.postSignupInfo(user)
            .then(function(){
                user.set('tos_accepted', true);
                return user.save();
            },
            function(error){
                $ionicLoading.hide({});
                console.log(error);
            })
            .then(function(){
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
