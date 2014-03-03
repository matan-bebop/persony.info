'use strict';

angular.module('personyApp', [
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      }).when('/people', {
        templateUrl: 'partials/people',
        controller: 'PeopleCtrl'
      }).when('/people/:name', {
        templateUrl: 'partials/detailsPerson',
        controller: 'DetailsPersonCtrl'
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
