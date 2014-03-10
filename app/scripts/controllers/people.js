'use strict';

angular.module('personyApp').controller('PeopleCtrl', ['Page', '$http', '$scope', function (Page, $http, $scope) {
  Page.setTitle('Люди');
  $http.get('/person').success(function(data) {
    $scope.persons = data;
  }).error(function() {
    console.log(arguments);
  });
}]);
