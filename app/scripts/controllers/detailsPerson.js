(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.personDetails',
        [
            'Page', '$routeParams', 'Person', 'Event', '$scope',
            function (Page, $routeParams, Person, Event, $scope) {
                $scope.person = Person.get(
                    {id: $routeParams.id},
                    function () {
                        Page.setTitle('Персони | ' + $scope.person.name);
                    }
                );

                $scope.eventYears = Event.queryByPerson({entityId: $routeParams.id});

                $scope.Event = new Event;

                $scope.numberOfDays = function (startDate, endDate) {
                    startDate = new Date(startDate);
                    endDate = new Date(endDate);
                    if (startDate && endDate) {
                        var millisecondsPerDay = 1000 * 60 * 60 * 24,
                            millisBetween = endDate.getTime() - startDate.getTime(),
                            days = millisBetween / millisecondsPerDay;

                        return Math.floor(days);
                    }
                };
            }
        ]
    );
}());
