(function () {
    'use strict';

    angular.module('personyApp').
        value('Navbar', {collapsed: true}).
        controller(
            'controllers.navbar',
            [
                '$scope', 'Search', 'Navbar',
                function ($scope, Search, Navbar) {
                    $scope.search = Search;
                    $scope.Navbar = Navbar;
                }
            ]
        );
}());