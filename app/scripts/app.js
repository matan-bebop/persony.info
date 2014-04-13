(function () {
    'use strict';

    angular.module('personyApp', ['ngRoute', 'ngResource', 'ngSanitize', 'rzModule',
        'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.tooltip', 'mgcrea.ngStrap.dropdown', 'mgcrea.ngStrap.scrollspy' ])
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
                    templateUrl: 'partials/error',
                    controller: 'errorCtrl'
                });

            $locationProvider.html5Mode(true).hashPrefix('!');
        }).run(function($rootScope, $location, $anchorScroll, $routeParams) {
            //when the route is changed scroll to the proper element.
            $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
                $location.hash($routeParams.scrollTo);
                $anchorScroll();
            });
        });
}());
