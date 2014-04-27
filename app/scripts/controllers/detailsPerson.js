(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.personDetails',
        [
            'Page', '$location', '$routeParams', 'Person', 'Event', '$scope', '$modal','$window',
            function (Page, $location, $routeParams, Person, Event, $scope, $modal, $window) {
            	
            	$scope.contentLoaded = false;

                $scope.spyoffset = ($window.innerWidth > 992) ? 240 : 160;

                $scope.expandedEventId = $location.search().scrollTo;

                var personCallback = function(person) {
                    if (!person){
                        $location.path('/error');
                    }
                    Page.setTitle('Персони | ' + $scope.person.name);

                    $scope.dropdownPersonTools = [
                        {
                            "text": "<i class=\"fa fa-pencil-square-o\"></i> &nbsp;Додати у кабінет",
                            "click": "alert('')"
                        },
                        {
                            "text": "<i class=\"fa fa-users\"></i> &nbsp;Додати до порівняння",
                            "click": "alert('')"
                        },
                        {
                            "text": "<span class=\"pop-primary\"><i class=\"fa fa-pencil\"></i> &nbsp;Редагувати</span>",
                            "click": "addEditPerson(person)"
                        },
                        {
                            "text": "<i class=\"fa fa-user\"></i>&nbsp;<i class=\"fa fa-plus\"></i> &nbsp;Додати персону",
                            "click": "addEditPerson()"
                        },
                        {
                            "text": "<span class=\"pop-warning\"><i class=\"fa fa-star\"></i> &nbsp; Я " + $scope.person.name + "</span>",
                            "click": "alert('')"
                        },
                        {
                            "text": "<span class=\"pop-danger\"><i class=\"fa fa-minus-circle\"></i> &nbsp;Поскаржитись</span>",
                            "click": "alert('')"
                        },
                        {
                            "text": "<i class=\"fa fa-bell\"></i>&nbsp;<i class=\"fa fa-plus\"></i> &nbsp;Додати подію",
                            "click": "addEditEvent()"
                        }
                    ];
                }

                $scope.person = Person.get(
                    {id: $routeParams.id},
                    personCallback,
                    function () {
                        $location.path('/error');
                    }

                );

                $scope.HOST_URL = "http://" + location.host;
                $scope.zoomSlider = 0;

                $scope.expandEvent = function (id) {
                    $scope.expandedEventId = id;
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
                    }

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

					var monthMaxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                    angular.forEach(events, function (event) {
                        var date = new Date(event.start),
                            year = date.getFullYear(),
                            month = date.getMonth(),
                            endDate = new Date(event.end),
                            endYear = endDate.getFullYear(),
                            endMonth = endDate.getMonth(),
                            day = endDate.getDate() - date.getDate();

                        if  (day === monthMaxDays[month] - 1) {
                        	event.day = '.';                        	
                        }
                        else {
                        	event.day = date.getDate();
                        }
                            
						if (endMonth - month === 11) {
							month = -1;
						}

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
                    $scope.contentLoaded = true;
                });

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

                $scope.dropdownEventFilters = [
                    {
                        "text": "Допа",
                        "click": "alert('')"
                    },
                    {
                        "text": "Рабінович",
                        "click": "alert('')"
                    },
                    {
                        "text": "Дарт Вейдер",
                        "click": "alert('')"
                    }
                ];

                $scope.dropdownEventTools= [
                    {
                        "text": "<span class=\"pop-primary\"><i class=\"fa fa-pencil\"></i> &nbsp;Редагувати</span>",
                        "click": "addEditEvent(event)"
                    },
                    {
                        "text": "<span class=\"pop-danger\"><i class=\"fa fa-minus-circle\"></i> &nbsp;Поскаржитись</span>",
                        "click": "alert('')"
                    }
                ];

            }
        ]
    );
}());
