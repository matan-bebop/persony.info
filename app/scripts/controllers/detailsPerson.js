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
        $http.get('/person/' + $routeParams.id).success(function(data) {
            $scope.person = data;
            Page.setTitle('Персони | ' + $scope.person.name);
        }).error(function() {
            console.log(arguments);
        });
        /*$scope.person = {
          name: 'Мустафа Найєм',
          info: 'Українській журналіст, один з активних допусувачів порталу \"Українська правда\". З ліпня 2013 працює на Громадському телебаченні.',
          photo: 'nayem.jpg',
          facebook: 'Mefistoff',
          twitter: 'mefimus'
        };
        Page.setTitle('Персони | ' + $scope.person.name);*/
    }]);
