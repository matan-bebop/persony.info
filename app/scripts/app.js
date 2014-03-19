(function () {
    'use strict';

    angular.module('personyApp', ['ngRoute', 'ngResource', 'ngSanitize'])
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'partials/main',
                    controller: 'controllers.main'
                }).when('/people', {
                    templateUrl: 'partials/people',
                    controller: 'controllers.people'
                }).when('/people/:id', {
                    templateUrl: 'partials/detailsPerson',
                    controller: 'controllers.personDetails'
                })
                .when('/about', {
                    templateUrl: 'partials/about',
                    controller: 'AboutCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true).hashPrefix('!');
        });
}());
