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

                $scope.zoomSlider = 7;

                $scope.translate = function(value)
                {
                    switch(value)
                    {
                        case 7:
                            return 'Дні';
                        case 6:
                            return 'Тижні';
                        case 5:
                            return 'Місяці';
                        case 4:
                            return 'Квартали';
                        case 3:
                            return 'Півріччя';
                        case 2:
                            return 'Роки';
                        case 1:
                            return 'П’ятиріччя';
                        case 0:
                            return 'Десятиріччя';
                        default:
                            return 'Дні';
                    }

                    /*
                     * switch(value)
                     {
                     case 7:
                     return '1д.'
                     case 6:
                     return '7д.';
                     case 5:
                     return '1м.';
                     case 4:
                     return '3м.';
                     case 3:
                     return '6м.';
                     case 2:
                     return '1р.';
                     case 1:
                     return '5р.';
                     case 0:
                     return '10р.';
                     default:
                     return '1д.';
                     }
                     * */
                }

                $scope.popup = function(title, description, image){
                    var modalInstance = $modal.open({
                        templateUrl: 'photoModal.html',
                        controller: 'controllers.photoModalCtrl',
                        /*windowClass: 'modal-sm',*/
                        resolve: {
                            name: function () {
                                return $scope.person.name;
                            },
                            title: function () {
                                return title;
                            },
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
            '$scope', '$modalInstance', 'name', 'title', 'image', 'description',
            function ($scope, $modalInstance, name, title, image, description) {
                $scope.modal = {
                    modalName: name,
                    modalTitle: title,
                    modalImage: image,
                    modalDescription: description
                }
            }
        ]
    );

    angular.module('personyApp').controller(
        'controllers.personTools',
        [
            '$scope',
            function ($scope) {
                $scope.items = [
                    "The first choice!",
                    "And another choice for you.",
                    "but wait! A third!"
                ];
            }
        ]
    );
}());
