/**
 * Created by levabd on 10.04.14.
 */
(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.personAddEdit',
        [
            '$scope', '$modalInstance', 'person',
            function ($scope, $modalInstance, person) {
                $scope.person = person;

                $scope.close = function () {
                    $modalInstance.close();
                };
            }
        ]
    );

    angular.module('personyApp').controller(
        'controllers.eventAddEdit',
        [
            '$scope', '$modalInstance', 'event',
            function ($scope, $modalInstance, event) {
                $scope.event = event;

                $scope.close = function () {
                    $modalInstance.close();
                };
            }
        ]
    );
}());
