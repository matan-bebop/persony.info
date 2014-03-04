'use strict';

angular.module('personyApp').controller('PeopleCtrl', ['Page', '$http', '$scope', function (Page, $http, $scope) {
  Page.setTitle('Люди');
  $http.get('/api/person/get/').success(function(data) {
    $scope.people = data;
  }).error(function() {
    console.log(arguments);
  });
}]);
