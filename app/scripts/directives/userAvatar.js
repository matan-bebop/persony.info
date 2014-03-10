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
            scope.$watch('src', function(value) {
                if (scope.src) {
                    element.replaceWith('<img src="avatars/' + value + '" alt="' + scope.title + '" class="' + avatarCssClasses + '" />');
                }
                else {
                    element.addClass(avatarCssClasses).append('<span class="glyphicon glyphicon-user"></span>');
                }
            });
        }
    };
  });
