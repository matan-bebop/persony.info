(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Search',
        [
            '$filter', '$location', '$route', 'Person',
            function ($filter, $location, $route, Person) {
                var persons = Person.query();
                return {
                    $promise: persons.$promise,
                    mode: null,
                    keyword: "",
                    clear: function () {
                        this.keyword = "";
                    },
                    find: function (mode) {
                        switch (mode || this.mode) {
                        case "featured":
                            return $filter('filter')(persons, {isFeatured: true});
                        case "name":
                            return $filter('filter')(persons, {name: this.keyword});
                        default:
                            return $filter('filter')(persons, this.keyword);
                        }
                    },
                    showResults: function () {
                        if ($location.path() === '/persons') {
                            $route.reload();
                        } else {
                            $location.path('/persons');
                        }
                    }
                };
            }
        ]
    );
}());