'use strict';

angular.module('personyApp').controller('DetailsPersonCtrl', ['Page', '$routeParams', '$scope', function (Page, $routeParams, $scope) {
  $scope.name = $routeParams.name;
  Page.setTitle('Персони | ' + $scope.name);
}]);
