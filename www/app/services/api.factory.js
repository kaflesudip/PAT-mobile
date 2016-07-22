(function() {
    'use strict';

    angular.module('patApp').factory('api', api);
    api.$inject = ['$http', '$q', 'RESOURCES', '$localStorage'];

    function api($http, $q, RESOURCES, $localStorage) {

        var service = {
            Signup: Signup,
            Login: Login,
            UpdateUser: UpdateUser,
            GetUserInfo: GetUserInfo
        };

        return service;

        function Signup(user){
            if (user.dob_old != null)
              user.dob = user.dob_old.toISOString().substr(0,10);
            user.is_full_profile = true;
            return $http.post(
                RESOURCES.API_URL + 'rest-auth/registration/',
                user
            )
                .then(function(response){
                  $localStorage.token = response.data.key;
                  $localStorage.is_full_profile = true;
                  $http.defaults.headers.common['Authorization'] = 'Token ' + response.data.key;
                  return response;
                }, function(errors){
                  return $q.reject(errors);
                });
        }

        function Login(user){
            return $http.post(
                RESOURCES.API_URL + 'rest-auth/login/',
                user
            )
                .then(function(response){
                    $localStorage.token = response.data.key;
                    $http.defaults.headers.common.Authorization = 'Token ' + response.data.key;
                    return response;
                }, function(errors){
                    return $q.reject(errors);
                });
        }

        function UpdateUser(user){
            if (typeof user.dob_old != 'undefined' && user.dob_old != null)
              user.dob = user.dob_old.toISOString().substr(0,10);
            return $http.patch(
                RESOURCES.API_URL + 'users/api/user-get-update/',
                user
            )
                .then(function(response){
                    if(response.data.tos_accepted)
                    {
                      $localStorage.tos_accepted = true;
                    }
                    if (response.data.is_full_profile)
                    {
                      $localStorage.is_full_profile = true;
                    }
                    return response;
                }, function(errors){
                    return $q.reject(errors);
                });
        }

        function GetUserInfo(){
            return $http.get(
              RESOURCES.API_URL + 'users/api/user-get-update/'
            )
                .then(function(response){
                    if (response.data.tos_accepted){
                        $localStorage.tos_accepted = true;
                    }
                    if (response.data.is_full_profile)
                    {
                      $localStorage.is_full_profile = true;
                    }
                    return response;
                }, function(errors){
                    return $q.reject(errors);
                })

        }



    }
})();
