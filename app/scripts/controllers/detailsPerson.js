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

                $scope.zoomSlider = 0;

                $scope.translate = function (value) {
                    switch (value) {
                        case 0:
                            return 'Дні';
                        case 1:
                            return 'Тижні';
                        case 2:
                            return 'Місяці';
                        case 3:
                            return 'Квартали';
                        case 4:
                            return 'Півріччя';
                        case 5:
                            return 'Роки';
                        case 6:
                            return 'П’ятиріччя';
                        case 7:
                            return 'Десятиріччя';
                        default:
                            return 'Дні';
                    }
                };

                $scope.popup = function (event) {
                    var modalInstance = $modal.open({
                        templateUrl: 'photoModal.html',
                        controller: 'controllers.photoModalCtrl',
                        /*windowClass: 'modal-sm',*/
                        resolve: {
                            name: function () {
                                return $scope.person.name;
                            },
                            title: function () {
                                return event.title;
                            },
                            image: function () {
                                return event.image;
                            },
                            description: function () {
                                return event.description;
                            }
                        }
                    });
                }

                $scope.personPopup = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'personModal.html',
                        controller: 'controllers.personModalCtrl',
                        resolve: {
                            person: function () {
                                return $scope.person;
                            },
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
        'controllers.personModalCtrl',
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
        'controllers.photoModalCtrl',
        [
            '$scope', '$modalInstance', 'name', 'title', 'image', 'description',
            function ($scope, $modalInstance, name, title, image, description) {
                $scope.modal = {
                    modalName: name,
                    modalTitle: title,
                    modalImage: image,
                    modalDescription: description
                }

                $scope.close = function () {
                    $modalInstance.close();
                };
            }
        ]
    );

    angular.module('personyApp').controller(
        'controllers.personTools',
        [
            '$scope',
            function ($scope) {
            }
        ]
    );

    angular.module('personyApp').controller(
        'controllers.eventTools',
        [
            '$scope',
            function ($scope) {
            }
        ]
    );

    angular.module('personyApp').controller(
        'controllers.eventFilters',
        [
            '$scope',
            function ($scope) {
                $scope.items = [
                    "Допа",
                    "Рабінович",
                    "Дарт Вейдер"
                ];
            }
        ]
    );
}());
