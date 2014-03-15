(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Search',
        ['$filter', '$location', '$route', 'Person',
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
                     mode || (mode = this.mode);
                     switch (mode) {
                     case "featured":
                         return $filter('filter')(persons, {isFeatured: true});
                         break;
                     case "name":
                         return $filter('filter')(persons, {name: this.keyword});
                         break;
                     default:
                         return $filter('filter')(persons, this.keyword);
                         break;
                     }
                 },
                 showResults: function () {
                     if ($location.path() === '/people') {
                         $route.reload();
                     } else {
                         $location.path('/people');
                     }
                 }
             };
         }]
    );
}());