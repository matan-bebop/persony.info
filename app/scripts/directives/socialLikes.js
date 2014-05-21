(function () {
    'use strict';

    angular.module('personyApp').directive('socialLikes', function () {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                element.socialLikes();
            }
        };
    });
}());
