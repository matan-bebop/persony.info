(function () {
    'use strict';

    angular.module('personyApp').directive('externalLink', [
        '$window',
        function ($window) {
            return function (scope, element, attrs) {
                element.bind('click', function (e) {
                    e.preventDefault();
                    $window.open(attrs.href);
                });
            };
        }
    ]);

    angular.module('personyApp').directive('externalAllInsideLink', [
        '$window',
        function ($window) {
            return function (scope, element, attrs) {
                element.find('a').bind('click', function (e) {
                    e.preventDefault();
                    $window.open(attrs.href);
                });
            };
        }
    ]);
}());