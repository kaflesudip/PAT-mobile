(function() {
    'use strict';
    angular.module('patApp').controller('MenuCtrl', MenuCtrl);
    MenuCtrl.$inject = ['$state', '$localStorage', '$ionicHistory', '$window'];

    function MenuCtrl($state, $localStorage, $ionicHistory, $window) {
        var vm = this;
        vm.logout = function(){
            console.log("logout");
            $localStorage.$reset();
            // $ionicHistory.clearCache();
            // $ionicHistory.clearHistory();
            // $state.go('default.login');
            $window.location.reload();
        }
    };
})();
