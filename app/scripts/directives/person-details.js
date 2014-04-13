(function () {
    'use strict';

    angular.module('personyApp').directive('personDetails', [
        '$window',
        function ($window) {
            return function (scope, element, attrs) {
                var shrinkHeader = 300;

                $($window).scroll(function () {
                    var scroll = $window.pageYOffset;
                    if (scroll >= shrinkHeader) {
                        $('.page-header').addClass('shrink');
                        $('.person-header-die').addClass('shrink');
                        $('.timeline-helper').addClass('shrink');
                    } else {
                        $('.page-header').removeClass('shrink');
                        $('.person-header-die').removeClass('shrink');
                        $('.timeline-helper').removeClass('shrink');
                    }
                });
            };
        }
    ]);
}());