(function () {
    'use strict';

    angular.module('personyApp').controller(
        'AboutCtrl',
        ['$scope', 'Page', 'Contact', '$timeout',
         function ($scope, Page, Contact, $timeout) {
             Page.setTitle('Про проект «Персони»');
             Page.setDescription('Проект «Персони» — це централізована достовірною база «візуального життєпису вчинків політиків». Оснований на трьох принципах: Наглядність, Достовірність, Відкритість');
             Page.setKeywords('персони, персони інфо, допомогти персони, чий проект персони, волонтери персони, про проект персони, що таке персони, проект персони');

             $scope.tabs = [
                 {
                     title: '<div class="about-icon"><i class="fa fa-bar-chart-o"></i></div><b class="about_pri">Наглядність</b>',
                     url:   'one.tpl.html'
                 },
                 {
                     title: '<div class="about-icon"><i class="fa fa-camera-retro"></i></div><b class="about_pri">Достовірність</h3>',
                     url:   'two.tpl.html'
                 },
                 {
                     title: '<div class="about-icon"><i class="fa fa-users"></i></div><b class="about_pri">Відкритість</b>',
                     url:   'three.tpl.html'
                 }
             ];

             $scope.currentTab = 'three.tpl.html';

             $scope.onClickTab = function (tab) {
                 $scope.currentTab = tab.url;
             };

             $scope.isActiveTab = function (tabUrl) {
                 return tabUrl == $scope.currentTab;
             };

             $scope.payLists = [
                 {
                     image:       'images/biggggidea2.jpg',
                     description: 'Для внесків з України. Менше 10 грн не приймає платіжна система. <br/>Призначення платежу: Добровільна пожертва на здійснення статутної діяльності проекту Персони.<br/><a href="">Перейти до проекту на сайті "Велика Ідея"</a>',
                     collapsed:   true
                 },
                 {
                     image:       'images/visa2.png',
                     description: 'Для внесків з України. Менше 10 грн не приймає платіжна система. <br/>Призначення платежу: Добровільна пожертва на здійснення статутної діяльності проекту Персони.<br/><a href="">Перейти до платіжної системи VISA</a>',
                     collapsed:   true
                 },
                 {
                     image:       'images/mastercard2.png',
                     description: 'Для внесків з України. Менше 10 грн не приймає платіжна система. <br/>Призначення платежу: Добровільна пожертва на здійснення статутної діяльності проекту Персони.<br/><a href="">Перейти до платіжної системи MasterCard</a>',
                     collapsed:   true
                 },
                 {
                     image:       'images/privat2.png',
                     description: 'Для внесків з України. Менше 10 грн не приймає платіжна система. <br/>Призначення платежу: Добровільна пожертва на здійснення статутної діяльності проекту Персони.<br/><a href="">Перейти до платіжної системи Приват24</a>',
                     collapsed:   true
                 },
                 {
                     image:       'images/PayPal2.png',
                     description: 'Для внесків з України. Менше 10 грн не приймає платіжна система. <br/>Призначення платежу: Добровільна пожертва на здійснення статутної діяльності проекту Персони.<br/><a href="">Перейти до платіжної системи PayPal</a>',
                     collapsed:   true
                 }
                 ,
                 {
                     image:       'images/bitcoin.png',
                     description: 'Для внесків з України. Менше 10 грн не приймає платіжна система. <br/>Призначення платежу: Добровільна пожертва на здійснення статутної діяльності проекту Персони.<br/><a href="">Перейти до платіжної системи bitcoin</a>',
                     collapsed:   true
                 }
             ];

             $scope.formLists = [
                 { collapsed: true },
                 { collapsed: true },
                 { collapsed: true },
                 { collapsed: true }
             ];


             $scope.groupCollapse = function (index) {

                 var i = 0;

                 $scope.payLists.forEach(function (entry) {
                     if (i === index) {
                         entry.collapsed = !entry.collapsed;
                     }
                     else {
                         entry.collapsed = true;
                     }

                     i++;
                 });
             };

             $scope.formCollapse = function (index) {

                 var i = 0;

                 $scope.formLists.forEach(function (entry) {
                     if (i === index) {
                         entry.collapsed = !entry.collapsed;
                     }
                     else {
                         entry.collapsed = true;
                     }

                     i++;
                 });
             };

             $scope.forms = {
                 $sending:   null,
                 $success:   null,
                 $error:     null,
                 developer:  {
                     name:       "",
                     email:      "",
                     skills:     {nodejs: false, angularjs: false, android: false, ios: false},
                     additional: ""
                 },
                 author:     {
                     name:       "",
                     email:      "",
                     profession: "",
                     additional: ""
                 },
                 cooperator: {
                     email:        "",
                     organisation: "",
                     subject:      ""
                 },
                 questioner: {
                     name:     "",
                     email:    "",
                     question: ""
                 }
             };

             $scope.sendForm = function (formName) {
                 $scope.forms.$sending = formName;
                 $scope.forms.$error = null;

                 var result = function (res) {
                     $scope.forms.$sending = null;
                     $scope.forms[res] = formName;
                     $timeout(function () {
                         $scope.forms.$success = null;
                         $scope.forms.$error = null;
                     }, 3000);
                 };
                 Contact(formName, $scope.forms[formName]).
                     success(function () {
                         result('$success');
                     }).
                     error(function () {
                         result('$error');
                     });
             };
         }]
    );
}());
