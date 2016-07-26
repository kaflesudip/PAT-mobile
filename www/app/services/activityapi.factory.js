(function() {
    'use strict';

    angular.module('patApp').factory('activityApi', activityApi);
    activityApi.$inject = ['$http', '$q', '$cordovaGeolocation', 'RESOURCES'];

    function activityApi($http, $q, $cordovaGeolocation,  RESOURCES) {
        var service = {
            listActivityType: listActivityType,
            postActivity: postActivity
        };

        return service;

        function listActivityType(){
            return $http.get(
                RESOURCES.API_URL + 'activity/type-list/'
            )
        }


        function postActivity(activity){
            var posOptions = { timeout: 10000, enableHighAccuracy: false };

            var response = $cordovaGeolocation.getCurrentPosition(posOptions)
                .then(function(position) {
                    activity.lat = position.coords.latitude;
                    activity.lon = position.coords.longitude;
                    console.log("post");
                    return $http.post(
                        RESOURCES.API_URL + 'activity/list-create/',
                        activity
                    )
                }, function(error) {
                    return $q.reject({
                        "data":
                         {"location": "Cannot identify your location. Please make sure that you have turned on location service."}

                      });
                });
            return response;
        }

    }
})();
