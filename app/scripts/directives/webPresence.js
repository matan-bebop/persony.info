'use strict';

angular.module('personyApp').directive('webPresence', function () {
    return {
        template: '<div></div>',
        replace: true,
        restrict: 'E',
        link: function postLink(scope, element) {
            if (!scope.person) {
                return;
            }
            scope.$watch('person.facebook + person.twitter', function() {
                var webPresenceLinks = [];
                if (scope.person.facebook) {
                    webPresenceLinks.push('<a href="https://facebook.com/' + scope.person.facebook + '" target="_blank">Фейсбук</a>');
                }
                if (scope.person.twitter) {
                    webPresenceLinks.push('<a href="https://twitter.com/' + scope.person.twitter + '" target="_blank">Твіттер</a>');
                }
                if (webPresenceLinks.length) {
                    element.empty().append('В мережі: ' + webPresenceLinks.join(', '));
                }
                element.addClass('person-social');
            });

        }
    };
});
