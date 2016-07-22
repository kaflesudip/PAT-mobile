(function() {
    'use strict';
    angular.module('patApp').controller('DashboardCtrl', DashboardCtrl);
    DashboardCtrl.$inject = ['$state', '$localStorage'];

    function DashboardCtrl($state, $localStorage ) {
        var vm = this;
        function checkAuthenticated() {
          console.log($localStorage)

            if (typeof $localStorage.token == 'undefined'){
                $state.go('default.login');
            }

            else if (typeof $localStorage.is_full_profile == 'undefined'){
                $state.go('default.completesocial');
            }
            else if (typeof $localStorage.tos_accepted == 'undefined'){
                $state.go('default.tos');
            }
        }

      checkAuthenticated();
    }
})();
