(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Person',
        [
            '$resource', 'Event',
            function ($resource, Event) {
                var Person = $resource("/api/persons/:name");

                Person.prototype.getPhotoSrc = function () {
                    if (this.photo) {
                        if (this.photo[0] === '/' || this.photo.substr(0, 4) === 'http') {
                            return this.photo;
                        }
                        return '/images/' + this.photo;
                    }
                    return null;
                };

				Person.prototype.getUrl = function() {
					return "/p/" + Translit.Url.code(this.name).toLowerCase();
				};

				Person.prototype.getLastEvent = function(callback) {
					console.log("omg", person.id);
					Event.query({personId: person.id, order: 'start'}, function(events) {
						callback(events[0]);
					})
				}

                return Person;
            }
        ]
    );
}());
