(function () {
    'use strict';

    angular.module('personyApp').directive('scrollUp', [
        '$window',
        function ($window) {
            return function (scope, element, attrs) {
                scope.$on('$routeChangeSuccess', function (scope, next, current) {
                    $window.scrollTo(0,0);
                })
            };
        }
    ]);
}());