(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Person',
        [
            '$resource',
            function ($resource) {
                var Person = $resource("/api/persons/:id");
                Person.prototype.getPhotoSrc = function () {
                    if (this.photo) {
                        if (this.photo[0] === '/' || this.photo.substr(0, 4) === 'http') {
                            return this.photo;
                        }
                        return '/images/' + this.photo;
                    }
                    return null;
                };

                return Person;
            }
        ]
    );
}());