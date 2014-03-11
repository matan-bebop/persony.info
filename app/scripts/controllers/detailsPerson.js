'use strict';

angular.module('personyApp').controller('DetailsPersonCtrl', ['Page', '$routeParams', '$http', '$scope',
    function (Page, $routeParams, $http, $scope) {
        $scope.person = {
            name: '',
            info: '',
            photo: '',
            facebook: '',
            twitter: ''
        };

        $http.get('/api/person/' + $routeParams.id).success(function(data) {
            $scope.person = data;
            Page.setTitle('Персони | ' + $scope.person.name);
        }).error(function() {
            console.log(arguments);
        });

        $http.get('/api/event/person/' + $routeParams.id).success(function(data) {
            console.log(data);
        }).error(function() {
            console.log(arguments);
        });

    }]);
