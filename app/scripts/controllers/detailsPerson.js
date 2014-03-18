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
         }]
    );
}());
