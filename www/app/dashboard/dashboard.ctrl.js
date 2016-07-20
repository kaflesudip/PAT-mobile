(function() {
    'use strict';
    angular.module('patApp').controller('DashboardCtrl', DashboardCtrl);
    DashboardCtrl.$inject = ['$state'];

    function DashboardCtrl($state ) {
        var vm = this;
        checkAuthenticated();

        function checkAuthenticated() {
            var user = Ionic.User.current();
            if (!user.isAuthenticated()){
                $state.go('default.login');
            }
            if (user.get('tos_accepted') == null){
                $state.go('default.tos');
            }
        }
    }
})();
