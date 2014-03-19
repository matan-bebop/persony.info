(function () {
    'use strict';

    angular.module('personyApp').filter('monthName', function () {
        var monthNames = [
            'Січень', 'Лютий', 'Березень',
            'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень',
            'Жовтень', 'Листопад', 'Грудень'
        ];
        return function (input) {
            if (input.toString().length > 2) {
                input = (new Date(input)).getMonth();
            }

            return monthNames[parseInt(input, 10)];
        };
    });
}());
