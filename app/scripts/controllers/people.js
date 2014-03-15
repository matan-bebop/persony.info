'use strict';

angular.module('personyApp').controller(
    'controllers.people',
    ['$scope', '$filter', 'Page', 'Person',
     function ($scope, $filter, Page, Person) {
         Page.setTitle('Люди');
         var persons;

         Person.query(
             function (data) {
                 persons = data;
                 $scope.filter.exec();
             },
             function () {
                 console.log(arguments);
             }
         );

         $scope.sort = {
             current: "name",
             reverse: false,
             is: function (field) {
                 return this.current === field;
             },
             change: function (field) {
                 if (this.current == field) {
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
     }]
);
