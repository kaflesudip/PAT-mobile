(function() {
    'use strict';
    angular.module('patApp').controller('ActivityCtrl', ActivityCtrl);
    ActivityCtrl.$inject = ['$ionicLoading', '$state', '$ionicPopup', 'activityApi'];

    function ActivityCtrl ($ionicLoading, $state, $ionicPopup, activityApi) {
        var vm = this;

        vm.data = {};

        vm.submit = function() {
            $ionicLoading.show({});
            activityApi.postActivity(vm.data)
                .then(function(response){
                    $ionicLoading.hide({});
                    console.log(response);
                    $state.go('app.complete');
                }, function(errors){
                    $ionicLoading.hide({});
                    console.log(errors);
                    var msg = errors.data[Object.keys(errors.data)[0]];
                    $ionicPopup.alert({
                        title: 'Warning Message',
                        template: msg
                    });
                });
        }

        $ionicLoading.show({});
        activityApi.listActivityType()
        .then(function(response){
            $ionicLoading.hide({});
            vm.activityList = response.data;
            vm.data.activity_type = vm.activityList[0].id;
        }, function(error){
            $ionicLoading.hide({});
            console.log(error);
        })


    };
})();
