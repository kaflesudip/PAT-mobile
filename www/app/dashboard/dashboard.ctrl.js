(function() {
    'use strict';
    angular.module('patApp').controller('DashboardCtrl', DashboardCtrl);
    DashboardCtrl.$inject = ['$state', '$localStorage'];

    function DashboardCtrl($state, $localStorage ) {
        var vm = this;
        checkAuthenticated();

        function checkAuthenticated() {
          console.log($localStorage)

            if (typeof $localStorage.token == 'undefined'){
                $state.go('default.login');
            }
            if (typeof $localStorage.tos_accepted == 'undefined'){
                $state.go('default.tos');
            }
        }
    }
})();
