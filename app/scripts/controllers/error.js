(function () {
    'use strict';

    angular.module('personyApp').controller(
        'controllers.404',
        ['$scope', 'Page',
            function ($scope, Page) {
                Page.setTitle('Такої сторінки не існує');
            }]
    );

	angular.module('personyApp').controller(
        'controllers.noPerson',
        ['$scope', 'Page', '$routeParams',
            function ($scope, Page, $routeParams) {
				function capitalize(str) {
					return str.replace(/\S*/g, function(txt){
						return txt.charAt(0).toLocaleUpperCase() + txt.substr(1);
					});
				}
                Page.setTitle('Персону не знайдено');
				$scope.name = Translit.Url.decode($routeParams.romanizedName);
				$scope.name = capitalize($scope.name);
            }]
    );

}());
