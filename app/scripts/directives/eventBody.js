(function () {
    'use strict';

    angular.module('personyApp').directive('eventBody', function () {
        var State = function (state) {
            this.value = state;
        };

        State.prototype.set = function (value) {
            this.value = value;
        };
        State.prototype.get = function () {
            return this.value;
        };
        State.prototype.is = function (value) {
            return value === this.value;
        };

        return {
            restrict: 'AC',
            link: function postLink(scope, element, attributes) {
                scope.state = new State(scope.$eval(attributes.defaultState));
            }
        };
    });
}());
