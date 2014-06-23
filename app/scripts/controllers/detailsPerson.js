(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.personDetails',
        [
            'Page', '$location', '$routeParams', 'Person', 'Event', '$scope', '$modal','$window', '$anchorScroll', '$sce',
            function (Page, $location, $routeParams, Person, Event, $scope, $modal, $window, $anchorScroll) {

                var match = $location.hash().match(/(event)([0-9]+)/),
                    eventId = match ? match[2] : null;
            	
            	$scope.contentLoaded = false;
            	$scope.modals = { 
            		imageAdded: false,
            		updateImage: function(evt) {
            			console.log('updateImage launched');
	                	var file = evt.dataTransfer !== undefined ? evt.dataTransfer.files[0] : evt.target.files[0];
	                	var imageAdded = true;
	                	var reader = new FileReader();
	                	var jcrop_api, boundx, boundy, xratio, yratio;
	                	reader.onload = (function(theFile) {
							return function(e) {
								var image = new Image();
								image.src = e.target.result;
								image.onload = function() {
									var canvas = document.createElement('canvas');
									canvas.width = image.naturalWidth;
									canvas.height = image.naturalHeight;
									var ctx = canvas.getContext('2d');
									ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
									
									$('#image_input').html('');
									$('#image_input').html('<img src="' + canvas.toDataURL() + '"/>');
							
									var img = $('#image_input img')[0];
									var canvas = document.createElement('canvas');
									canvas.width = canvas.height = 180;
									xratio = image.naturalWidth / $('#image_input img').width();
									yratio = image.naturalHeight / $('#image_input img').height();
							
									$('#image_input img').Jcrop({
										bgColor: 'black',
										bgOpacity: .6,
										setSelect: [0, 0, 100, 100],
										aspectRatio: 1,
										onSelect: imgSelect,
										onChange: imgSelect
									});
							
									function imgSelect(selection) {						
										var ctx = canvas.getContext('2d');
										ctx.drawImage(img, selection.x * xratio, selection.y * yratio, selection.w * xratio, selection.h * yratio, 0, 0, canvas.width, canvas.height);
									
										$('#image_output').attr('src', canvas.toDataURL());
									}
								}
							}
						})(file);
						reader.readAsDataURL(file);
	                }
            	};

                $scope.spyoffset = ($window.innerWidth > 992) ? 240 : 160;

                $scope.expandedEventId = eventId;

                var personCallback = function(person) {
                    if (!person){
                        $location.path('/error');
                    }

                    Page.setTitle('Персони — ' + $scope.person.name);
                    Page.setDescription('Персона ' + $scope.person.name + '. ' + $scope.person.info);
                    Page.setKeywords('персони, персони інфо, що зробив' + $scope.person.name + ', чим відомий' + $scope.person.name + ', вчинки' + $scope.person.name + ', біографія' + $scope.person.name);

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
                
                $scope.eventLabelClick = function(id, e) {
                	var nullEvent = document.getElementById('#event0');
                	var targetEvent = document.getElementById('#event' + id);
                	if (!nullEvent.checked) {
                		if (targetEvent.checked) {
	                		e.stopPropagation();
	      					e.preventDefault();
      					}
                		nullEvent.checked = true;
                	}
                };

                $scope.scrollToEvent = function (id) {
                    $location.hash('event'+id);
                    $anchorScroll();
                };
                
                $scope.forms = {
	                $sending:   null,
	                $success:   null,
	                $error:     null,
	                personEdit:  {
	                    name:       "",
	                    email:      "",
	                    skills:     {nodejs: false, angularjs: false, android: false, ios: false},
	                    additional: ""
	                }
             	};
             	
             	$scope.sendForm = function (formName) {
	                $scope.forms.$sending = formName;
	                $scope.forms.$error = null;
	
	                var result = function (res) {
	                    $scope.forms.$sending = null;
	                    $scope.forms[res] = formName;
	                    $timeout(function () {
	                        $scope.forms.$success = null;
	                        $scope.forms.$error = null;
	                    }, 3000);
	                };
	                Contact(formName, $scope.forms[formName]).
	                    success(function () {
	                        result('$success');
	                    }).
	                    error(function () {
	                        result('$error');
	                    });
             	};

                $scope.addEditEvent = function (event) {

                    /*var init = {};
                    if (event){
                        init = {};
                    };

                    var modalInstance = $modal.open({
                        templateUrl: 'partials/eventAddEdit',
                        controller: 'controllers.eventAddEdit',
                        resolve: init
                    });*/
                   
                   var editEventModal = $modal({
                        "title": "Редагування події",
                        "animation": "am-fade-and-slide-top",
                        "placement": "center",
                        "template": "eventEdit.html",
                        scope: $scope,
                        show: true
                    });
                }

                $scope.addEditPerson = function (person) {

                    /*var init = {};
                    if (person){
                        init = {};
                    }

                    var modalInstance = $modal.open({
                        templateUrl: 'partials/personAddEdit',
                        controller: 'controllers.personAddEdit',
                        resolve: init
                    });*/
                   var editPersonModal = $modal({
                        "title": "Редагування персони",
                        "animation": "am-fade-and-slide-top",
                        "placement": "center",
                        "template": "personEdit.html",
                        show: true
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
                            endMonth = endDate.getMonth(),
                            day = endDate.getDate() - date.getDate();

                        if  (day === monthMaxDays[month] - 1) {
                        	event.day = '&nbsp;';
                        	event.displayDate = false;                        	
                        }
                        else {
                        	event.day = '<span>' + date.getDate() + '</span>';
                        	event.displayDate = true;
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
                    $scope.scrollToEvent($scope.expandedEventId);
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
