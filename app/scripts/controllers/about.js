(function () {
    'use strict';

    angular.module('personyApp').controller(
        'AboutCtrl',
        ['$scope', 'Page',
            function ($scope, Page) {
                Page.setTitle('Про проект');

                $scope.tabs = [{
                    title: '<i>One</i>',
                    url: 'one.tpl.html'
                }, {
                    title: 'Two',
                    url: 'two.tpl.html'
                }, {
                    title: 'Three',
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
