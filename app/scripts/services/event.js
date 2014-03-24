(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Event',
        [
            '$resource',
            function ($resource) {
                var Event = $resource("/api/events/:id");

                Event.prototype.getImageSrc = function () {
                    if (this.image) {
                        if (this.image[0] === '/' || this.image.substr(0, 4) === 'http') {
                            return this.image;
                        }
                        return '/images/' + this.image;
                    }
                    return null;
                };

                Event.prototype.getDuration = function () {
                    var startDate, endDate, millisecondsPerDay = 1000 * 60 * 60 * 24;


                    if (this.duration === undefined) {
                        if (this.start && this.end) {
                            startDate = new Date(this.start);
                            endDate = new Date(this.end);
                            this.duration = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
                        } else {
                            this.duration = 1;
                        }
                    }

                    return this.duration;
                };

                return Event;
            }
        ]
    );
}());
