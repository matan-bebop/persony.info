(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Person',
        [
            '$resource',
            function ($resource) {
                return $resource("/api/persons/:id");
            }
        ]
    );
}());