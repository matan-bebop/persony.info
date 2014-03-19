(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Event',
        [
            '$resource',
            function ($resource) {
                var Event = $resource(
                    "/api/event/:id/:entity/:entityId",
                    {
                        data_format: 'array'
                    },
                    {
                        queryByPerson: {
                            method: 'GET',
                            params: {
                                entity: 'person',
                                entityId: '@personId'
                            },
                            isArray: true
                        }
                    }
                );

                Event.prototype.getImageSrc = function (data) {
                    var that;

                    if (data) {
                        that = data;
                    } else {
                        that = this;
                    }


                    if (that.image) {
                        if (that.image[0] === '/' || that.image.substr(0, 4) === 'http') {
                            return that.image;
                        }
                        return '/images/' + that.image;
                    }
                    return null;
                };

                Event.prototype.getDuration = function (data) {
                    var startDate, endDate, millisecondsPerDay = 1000 * 60 * 60 * 24, that;

                    if (data) {
                        that = data;
                    } else {
                        that = this;
                    }

                    if (that.duration === undefined) {
                        if (that.start && that.end) {
                            startDate = new Date(that.start);
                            endDate = new Date(that.end);
                            that.duration = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
                        } else {
                            that.duration = 11111;
                        }
                    }

                    return that.duration;
                };

                return Event;
            }
        ]
    );
}());
