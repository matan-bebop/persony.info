(function () {
    'use strict';

    angular.module('personyApp').directive('scrollUp', [
        '$window', '$location',
        function ($window, $location) {
            return function (scope, element, attrs) {
                scope.$on('$routeChangeSuccess', function (scope, next, current) {
                    if (!$location.hash()) {
                        $window.scrollTo(0, 0);
                    }
                })
            };
        }
    ]);
}());