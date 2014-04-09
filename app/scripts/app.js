(function () {
    'use strict';

    angular.module('personyApp', ['ngRoute', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'rzModule', 'duScroll'])
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'partials/main',
                    controller: 'controllers.main'
                }).when('/persons', {
                    templateUrl: 'partials/persons',
                    controller: 'controllers.persons'
                }).when('/persons/:id', {
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
