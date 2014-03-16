(function () {
    'use strict';

    angular.module('personyApp').directive('eventBody', function () {
        return {
            restrict: 'AC',
            link: function postLink(scope, element, attributes) {
                scope.state = {
                    value: scope.$eval(attributes.defaultState),
                    set: function (value) {
                        this.value = value;
                    },
                    get: function () {
                        return this.value;
                    },
                    is: function (value) {
                        return value == this.value;
                    }
                };
            }
        };
    });
}());