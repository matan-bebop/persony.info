(function () {
    'use strict';

    angular.module(
            'personyApp',
            [
                'ngRoute', 'ngResource', 'ngSanitize', 'rzModule',
                'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.tooltip',
                'mgcrea.ngStrap.dropdown', 'mgcrea.ngStrap.scrollspy',
                'mgcrea.ngStrap.helpers.dimensions',
                'ui.bootstrap.datetimepicker', 'ui.select2', 'ngSocial'
            ]
        )
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'partials/main',
                    controller: 'controllers.main'
                })
                .when('/persons', {
                    templateUrl: 'partials/persons',
                    controller: 'controllers.persons'
                })
                .when('/persons/:id', {
                    templateUrl: 'partials/detailsPerson',
                    controller: 'controllers.personDetails',
                    reloadOnSearch: false
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
            //scroll to the hash spevified in scrollTo route parameter
            $rootScope.hashScroll = function(){
            	$anchorScroll($routeParams.scrollTo);
            }
        });
}());
