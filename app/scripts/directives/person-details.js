(function () {
    'use strict';

    angular.module('personyApp').directive('personDetails', [
        '$window',
        function ($window) {
            return function (scope, element, attrs) {
                var shrinkHeader = 300;

                angular.element($window).scroll(function () {
                    var scroll = $window.pageYOffset;
                    if (scroll >= shrinkHeader) {
                        angular.element('.page-header').addClass('shrink');
                        angular.element('.person-header-die').addClass('shrink');
                        angular.element('.timeline-helper').addClass('shrink');
                    } else {
                        angular.element('.page-header').removeClass('shrink');
                        angular.element('.person-header-die').removeClass('shrink');
                        angular.element('.timeline-helper').removeClass('shrink');
                    }
                });
            };
        }
    ]);

    angular.module('personyApp').directive('onLastRepeat', [
        '$window',
        function ($window) {
            return function (scope, element, attrs) {
                if (scope.$last) {
                    setTimeout(function(){
                        angular.element("div.share").socialLikes();
                    }, 1);
                }
            };
        }
    ]);

}());
