(function() {
    'use strict';

    angular.module('patApp').factory('api', api);
    api.$inject = ['$http'];

    function api($http) {

        var service = {
            postSignupInfo: postSignupInfo
        };

        return service;

        function postSignupInfo(user){
          console.log(user);
          var data = {
            "ionic_id": user.id,
            "email": user.get('email'),
            "sex": user.get('sex'),
            "zip_code": user.get('zip_code'),
            "dob": user.get('dob'),
            "tos_accepted": true,
            "tos_accepted_date": new Date()
          };
          return $http.post(
            'http://192.168.100.2:8000/users/api/ionic-users-list-create/',
            data
          );
        }

    }
})();
