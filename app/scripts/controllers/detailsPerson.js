'use strict';

angular.module('personyApp').controller('DetailsPersonCtrl', ['Page', '$routeParams', '$http', '$scope', 'monthNames',
    function (Page, $routeParams, $http, $scope, monthNames) {
        $scope.person = {
            name: '',
            info: '',
            photo: '',
            facebook: '',
            twitter: ''
        };

        $scope.monthNames = monthNames;

        $http.get('/api/person/' + $routeParams.id).success(function(data) {
            $scope.person = data;
            Page.setTitle('Персони | ' + $scope.person.name);
        }).error(function() {
            console.log(arguments);
        });

        $http.get('/api/event/person/' + $routeParams.id  + '?data_format=array').success(function(data) {
            $scope.eventYears = data;
        }).error(function() {
            console.log(arguments);
        });

    }]);
