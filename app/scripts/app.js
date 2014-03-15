'use strict';

angular.module('personyApp', [
  'ngRoute', 'ngResource', 'ngSanitize'
])
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

  })

  .constant('monthNames', ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Чернвень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']);
