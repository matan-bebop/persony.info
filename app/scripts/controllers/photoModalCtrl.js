(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.photoModalCtrl',
        [
            '$scope', '$modalInstance', image, description,
            function ($scope, $modalInstance, image, description) {
                $scope.modal = {
                    image: function () {
                        return image;
                    },
                    description: function () {
                        return description;
                    }
                }
            }
        ]
    );
}());
