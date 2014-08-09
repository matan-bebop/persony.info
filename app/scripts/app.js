(function () {
    'use strict';

    angular.module(
            'personyApp',
            [
                'ngRoute', 'ngResource', 'ngSanitize',
			   
				'rzModule',
				'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.tooltip',
                'mgcrea.ngStrap.dropdown', 'mgcrea.ngStrap.scrollspy',
                'mgcrea.ngStrap.helpers.dimensions', 'mgcrea.ngStrap.navbar',
				
				'ngSocial'
            ]
        )
        .config(function ($routeProvider, $locationProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'partials/main',
                    controller: 'controllers.main'
                })
                .when('/all', {
                    templateUrl: 'partials/persons',
                    controller: 'controllers.persons'
                })
                .when('/p/:romanizedName', {
                    templateUrl: 'partials/detailsPerson',
                    controller: 'controllers.personDetails',
                    reloadOnSearch: false
                })
                .when('/unknown/:romanizedName', {
                    templateUrl: 'partials/noPerson',
                    controller: 'controllers.noPerson',
                    reloadOnSearch: false
                })
                .when('/about', {
                    templateUrl: 'partials/about',
                    controller: 'AboutCtrl'
                })
                .otherwise({
                    templateUrl: 'partials/error',
                    controller: 'controllers.404'
                });

            $locationProvider.html5Mode(true).hashPrefix('!');
        }).run(function($rootScope, $location, $anchorScroll, $routeParams) {
            // scroll to a hash specified in the scrollTo route parameter
            $rootScope.hashScroll = function(){
            	$anchorScroll($routeParams.scrollTo);
            }
        });
}());
