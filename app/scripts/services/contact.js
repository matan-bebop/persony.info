(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Contact',
        [
            '$http',
            function ($http) {
                return function(type, data){
                    return $http.post('/contact/' + type, data);
                }
            }
        ]
    );
}());
