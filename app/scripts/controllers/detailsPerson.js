'use strict';

angular.module('personyApp').controller('DetailsPersonCtrl', ['Page', '$routeParams', '$http', '$scope',
  function (Page, $routeParams, $http, $scope) {
    $http.get('/api/person/get/' + $routeParams.id).success(function(data) {
      $scope.person = data;
      Page.setTitle('Персони | ' + $scope.person.name);
    }).error(function() {
      console.log(arguments);
    });
  }]);
