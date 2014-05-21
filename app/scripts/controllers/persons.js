(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.persons',
        [
            '$scope', '$filter', 'Page', 'Search',
            function ($scope, $filter, Page, Search) {

                Page.setTitle('Всі біографії публічних людей');
                Page.setDescription('Проект «Персони» — перелік всіх біографій публічних людей у наглядному поданні та основанних на достовірній інформації. Кожен може стати дописувачем біографій персони, якою він зацікавлений.');
                Page.setKeywords('персони, персони інфо, біографії політиків, життєписи відомих людей, вчинки політиків, достовірна інформація, наглядні біографії');

                Search.$promise.then(
                    function () {
                        var persons = Search.find();

                        $scope.sort = {
                            current: "name",
                            reverse: false,
                            is: function (field) {
                                return this.current === field;
                            },
                            change: function (field) {
                                if (this.current === field) {
                                    this.reverse = !this.reverse;
                                } else {
                                    this.reverse = false;
                                    this.current = field;
                                }

                                this.exec();
                            },
                            exec: function () {
                                $scope.persons = $filter('orderBy')($scope.persons, this.current, this.reverse);
                            }
                        };

                        $scope.filter = {
                            search: "",
                            exec: function () {
                                $scope.persons = $filter('filter')(persons, {name: this.search});
                                $scope.sort.exec();
                            }
                        };

                        $scope.filter.exec();
                    }
                );

            }
        ]
    );
}());