'use strict';

angular.module('personyApp').directive('userAvatar', function () {
    return {
        template: '<div></div>',
        replace: true,
        restrict: 'E',
        scope: {
            src: '@',
            title: '@'
        },
        link: function postLink(scope, element) {
            var avatarCssClasses = 'person-photo pull-left';
            scope.$watch('src', function (value) {
                console.log(value);
                if (scope.src) {
                    element.replaceWith('<img src="' + value + '" alt="' + scope.title + '" class="' + avatarCssClasses + '"  ng-click="personPopup()"/>');
                } else {
                    element.addClass(avatarCssClasses).append('<span class="fa fa-user fa-3x"></span>');
                }
            });
        }
    };
});
