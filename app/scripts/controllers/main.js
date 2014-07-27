(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.main',
        ['$scope', 'Page', 'Search',
         function ($scope, Page, Search) {
             Page.setTitle('Персони — Головна');
             Page.setDescription('Проект «Персони» — це централізована достовірною база «візуального життєпису вчинків політиків». Оснований на трьох принципах: Наглядність, Достовірність, Відкритість');
             Page.setKeywords('персони, персони інфо, біографії політиків, життєписи відомих людей, вчинки політиків, достовірна інформація, наглядні біографії');
             var twitterIds = [
                 '455813515790393344',
                 '455814017508839424',
                 '455814318009753600',
                 '455814797431304192',
                 '455815126700924929',
                 '455815294481485824',
                 '455815510110662656',
                 '455815842865741824',
                 '455816010260430849',
                 '455816187524292608',
                 '455816340247289856',
                 '455816501740593152',
                 '455816688441647104',
                 '455816850333384704',
                 '467965345433534464',
                 '467966676021964800',
                 '467967783997673472',
                 '467968387641913344',
                 '467968822595428352'
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

             $scope.persons = Person.query();
             $scope.search = Search;
         }]
    );
}());
