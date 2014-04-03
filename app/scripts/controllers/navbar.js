(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.navbar',
        [
            '$scope', 'Search',
            function ($scope, Search) {
                $scope.search = Search;
            }
        ]
    );
}());