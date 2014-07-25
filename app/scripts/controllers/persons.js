(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.persons',
        [
            '$scope', '$filter', 'Page', 'Person', 'Search',
            function ($scope, $filter, Page, Person, Search) {

                Page.setTitle('Всі біографії публічних людей');
                Page.setDescription('Проект «Персони» — перелік всіх біографій публічних людей у наглядному поданні та основанних на достовірній інформації. Кожен може стати дописувачем біографій персони, якою він зацікавлений.');
                Page.setKeywords('персони, персони інфо, біографії політиків, життєписи відомих людей, вчинки політиків, достовірна інформація, наглядні біографії');

				$scope.persons = Person.query();

				/*$scope.determineLastEventsInProcess = $scope.persons.length;
				angular.forEach($scope.persons, function(p) {
					p.getLastEvent(function(date) {
						p.lastEventDate = date;
						--$scope.determineLastEventsInProcess;
					});
				});*/

				$scope.search = Search;
            }
        ]
    );
}());
