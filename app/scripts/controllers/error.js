(function () {
    'use strict';

    angular.module('personyApp').controller(
        'errorCtrl',
        ['$scope', 'Page',
            function ($scope, Page) {
                Page.setTitle('Персону не знайдено');
            }]
    );
}());
