(function() {
    'use strict';
    angular.module('patApp').controller('MenuCtrl', MenuCtrl);
    MenuCtrl.$inject = ['$state', '$localStorage', '$ionicHistory', '$window'];

    function MenuCtrl($state, $localStorage, $ionicHistory, $window) {
        var vm = this;
        vm.logout = function(){
            $localStorage.$reset();
            $window.location.reload();
        }

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
    };
})();
