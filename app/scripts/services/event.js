(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Event',
        ['$resource',
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

             Event.prototype.getImageSrc = function () {
                 if (this.image) {
                     if (this.image[0] === '/' || this.image.substr(0, 4) === 'http') {
                         return this.image;
                     }
                     return '/images/' + this.image;
                 }
                 return null;
             };

             return Event;
         }]
    );
}());
