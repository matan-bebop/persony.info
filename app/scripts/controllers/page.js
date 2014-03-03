'use strict';

angular.module('personyApp').controller('PageCtrl', ['$scope', '$location', 'Page', function ($scope, $location, Page) {

  $scope.Page = Page;

  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) === path) {
      return true;
    } else {
      return false;
    }
  };

}]);
