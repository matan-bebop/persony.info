(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.personDetails',
        [
            'Page', '$routeParams', 'Person', 'Event', '$scope', '$modal',
            function (Page, $routeParams, Person, Event, $scope, $modal) {
                $scope.person = Person.get(
                    {id: $routeParams.id},
                    function () {
                        Page.setTitle('Персони | ' + $scope.person.name);
                    }
                );

                $scope.popup = function(image, description){
                    var modalInstance = $modal.open({
                        templateUrl: 'photoModal.html',
                        controller: 'controllers.photoModalCtrl',
                        resolve: {
                            image: function () {
                                return image;
                            },
                            description: function () {
                                return description;
                            }
                        }
                    });
                }

                Event.query({personId: $routeParams.id, order: 'start.desc'}, function (events) {
                    var data = {
                        orders: {
                            years: [],
                            months: {}
                        }
                    };

                    angular.forEach(events, function (event) {
                        var date = new Date(event.start),
                            year = date.getFullYear(),
                            month = date.getMonth();

                        if (!data[year]) {
                            data.orders.years.push(year);
                            data.orders.months[year] = [];
                            data[year] = {};
                        }

                        if (!data[year][month]) {
                            data.orders.months[year].push(month);
                            data[year][month] = [];
                        }

                        data[year][month].push(event);
                    });

                    $scope.eventYears = data;
                });
            }
        ]
    );

    angular.module('personyApp').controller(
        'controllers.photoModalCtrl',
        [
            '$scope', '$modalInstance', 'image', 'description',
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
