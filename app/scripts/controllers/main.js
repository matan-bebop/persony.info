(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.main',
        ['$scope', 'Page', 'Search',
         function ($scope, Page, Search) {
             Page.setTitle('Персони - Головна');

             $scope.slides = [
                 {
                     image: 'http://placekitten.com/603/300',
                     text: 'Kittys3',
                     title: 'Mi'
                 },
                 {
                     image: 'http://placekitten.com/601/300',
                     text: 'Kittys1',
                     title: 'MiMi'
                 },
                 {
                     image: 'http://placekitten.com/602/300',
                     text: 'Kittys2',
                     title: 'MiMiMi'
                 }
             ]

             $scope.search = Search;

             Search.$promise.then(function(){
                 $scope.featured = Search.find('featured');
             });
         }]
    );
}());
