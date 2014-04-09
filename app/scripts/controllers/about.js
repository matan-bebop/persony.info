(function () {
    'use strict';

    angular.module('personyApp').controller(
        'AboutCtrl',
        ['$scope', 'Page',
            function ($scope, Page) {
                Page.setTitle('Про проект');

                $scope.tabs = [{
                    title: '<div class="about-icon"><i class="fa fa-bar-chart-o"></i></div>'+' <b class="about_pri">Наглядність</b>',
                    url: 'one.tpl.html'
                }, {
                    title: '<div class="about-icon"><i class="fa fa-camera-retro"></i></div>'+' <b class="about_pri">Достовірність</h3>',
                    url: 'two.tpl.html'
                }, {
                    title: '   <div class="about-icon"><i class="fa fa-users"></i></div>'+'<b class="about_pri">Відкритість</b>',
                    url: 'three.tpl.html'
                }];

                $scope.currentTab = 'one.tpl.html';

                $scope.onClickTab = function (tab) {
                    $scope.currentTab = tab.url;
                }

                $scope.isActiveTab = function(tabUrl) {
                    return tabUrl == $scope.currentTab;
                }

            }]
    );
}());
