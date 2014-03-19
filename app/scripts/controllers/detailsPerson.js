(function () {
    'use strict';

    angular.module('personyApp').controller(
        'DetailsPersonCtrl',
        ['Page', '$routeParams', 'Person', 'Event', '$scope', 'monthNames',
         function (Page, $routeParams, Person, Event, $scope, monthNames) {
             $scope.person = Person.get(
                 {id: $routeParams.id},
                 function () {
                     Page.setTitle('Персони | ' + $scope.person.name);
                 }
             );
             $scope.monthNames = monthNames;

             $scope.eventYears = Event.queryByPerson({entityId: $routeParams.id});

             $scope.numberOfDays = function(startDate, endDate) {
                 if (startDate && endDate) {
                    var millisecondsPerDay = 1000 * 60 * 60 * 24;
                    var millisBetween = endDate.getTime() - startDate.getTime();
                    var days = millisBetween / millisecondsPerDay;

                    return Math.floor(days);
                 }
             };


         }]
    );
}());
