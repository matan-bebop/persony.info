(function () {
    'use strict';

    angular.module('personyApp').directive('eventIconMarker', ['$window', function ($window) {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                if (attrs.source && ['facebook', 'twitter', 'google-plus', 'vkontakte'].indexOf(attrs.source) !== -1) {
                    element.addClass(attrs.source).text('');
                } else {
                    element.addClass('default').text(attrs.source[0]);
                }

                if (attrs.href) {
                    element.on('click', function () {
                        $window.open(attrs.href);
                    });
                } else {
                    element.css('cursor', 'auto');
                }
            }
        };
    }]);
}());
