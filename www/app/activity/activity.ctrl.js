(function() {
    'use strict';
    angular.module('patApp').controller('ActivityCtrl', ActivityCtrl);
    ActivityCtrl.$inject = ['$cordovaGeolocation' ];

    function ActivityCtrl($cordovaGeolocation) {
      var vm = this;

      vm.data = {};

      vm.submit = function(){
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
              vm.data.lat  = position.coords.latitude;
              vm.data.lon = position.coords.longitude;
          }, function(err) {
              console.log(err);
          });
      }


    };
})();
