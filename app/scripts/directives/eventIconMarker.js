(function () {
    'use strict';

    angular.module('personyApp').directive('eventIconMarker', ['$window', function ($window) {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                var source = attrs.source;
                if (source === 'vk') {
                    source = 'vkontakte';
                }
                if (source && ['facebook', 'twitter', 'google-plus', 'vkontakte'].indexOf(source) !== -1) {
                    element.addClass(source).text('');
                } else if (source) {
                    element.addClass('default').text(source[0]);
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
