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
            }
        ]
    );
}());
