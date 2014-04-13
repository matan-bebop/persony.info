(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.personDetails',
        [
            'Page', '$location', '$routeParams', 'Person', 'Event', '$scope', '$modal','$window',
            function (Page, $location, $routeParams, Person, Event, $scope, $modal, $window) {

                $scope.spyoffset = ($window.innerWidth > 992) ? 210 : 160;

                $scope.person = Person.get(
                    {id: $routeParams.id},
                    function (person) {
                        if (!person){
                            $location.path('/error');
                        }
                        Page.setTitle('Персони | ' + $scope.person.name);
                    },
                    function () {
                        $location.path('/error');
                    }

                );
                $scope.HOST_URL = "http://" + location.host;
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

                $scope.addEditEvent = function (event) {

                    var init = {};
                    if (event){
                        init = {};
                    };

                    var modalInstance = $modal.open({
                        templateUrl: 'partials/eventAddEdit',
                        controller: 'controllers.eventAddEdit',
                        resolve: init
                    });
                }

                $scope.addEditPerson = function (person) {

                    var init = {};
                    if (person){
                        init = {};
                    };

                    var modalInstance = $modal.open({
                        templateUrl: 'partials/personAddEdit',
                        controller: 'controllers.personAddEdit',
                        resolve: init
                    });
                }

                $scope.popupEventPhoto = function (event) {
                    var photoModal = $modal({
                        "title": $scope.person.name + "<br />" + event.title,
                        "content": "<img src=\"" + event.image + "\" alt=\"" + event.title + "\" title='" + event.title + "'></div><div class=\"modal-footer\">" + event.description,
                        "animation": "am-fade-and-slide-top",
                        "placement": "center",
                        "template": "photoModal.html",
                        show: true
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
}());
