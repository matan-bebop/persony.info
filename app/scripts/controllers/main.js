(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.main',
        ['$scope', 'Page', 'Search',
         function ($scope, Page, Search) {
             Page.setTitle('Персони - Головна');
             $scope.search = Search;

             Search.$promise.then(function(){
                 $scope.featured = Search.find('featured');
             });
         }]
    );
}());
