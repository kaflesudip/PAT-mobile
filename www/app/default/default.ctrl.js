(function() {
    'use strict';
    angular.module('patApp').controller('DefaultCtrl', DefaultCtrl);
    DefaultCtrl.$inject = [];

    function DefaultCtrl() {
        var vm = this;

        vm.islogin = true;
    };
})();
