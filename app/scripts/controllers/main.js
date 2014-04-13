(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.main',
        ['$scope', 'Page', 'Search',
         function ($scope, Page, Search) {
             Page.setTitle('Персони - Головна');
             var twitterIds = [
                 '454716649438846977',
                 '454735082880655360',
                 '454863394638532608',
                 '454863648981147651'
             ];

             function shuffle(array) {
                 var currentIndex = array.length
                     , temporaryValue
                     , randomIndex
                     ;

                 // While there remain elements to shuffle...
                 while (0 !== currentIndex) {

                     // Pick a remaining element...
                     randomIndex = Math.floor(Math.random() * currentIndex);
                     currentIndex -= 1;

                     // And swap it with the current element.
                     temporaryValue = array[currentIndex];
                     array[currentIndex] = array[randomIndex];
                     array[randomIndex] = temporaryValue;
                 }

                 return array;
             }

             var loadTweets = function () {
                 //reset tweet inner
                 $('#tweet-left').html('<i class="fa fa-refresh fa-spin fa-4x"></i>');
                 $('#tweet-right').html('<i class="fa fa-refresh fa-spin fa-4x"></i>');

                 //randomise persons twitter
                 shuffle(twitterIds);
                 twitterFetcher.fetch(twitterIds[0], 'tweet-left', 1, true);
                 twitterFetcher.fetch(twitterIds[1], 'tweet-right', 1, true);
             }

             loadTweets();

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
             ];

             $scope.nextTwitterQuote = loadTweets;

             $scope.search = Search;

             Search.$promise.then(function(){
                 $scope.featured = Search.find('featured');
             });
         }]
    );
}());
