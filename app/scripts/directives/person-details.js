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

                    /*if ($('.helper-month').hasClass('active')){
                        var year = $('.helper-month').data("year");
                        console.log('#spy-listener' + year);
                        if (!('#spy-listener' + year).hasClass('active1')) {
                            ('#spy-listener' + year).addClass('active1');
                        }
                    } else{
                        ('#spy-listener' + year).removeClass('active1');
                    }*/
                });
            };
        }
    ]);
}());