(function () {
    'use strict';

	angular.module('personyApp').filter('toTrusted', ['$sce', function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}]);
}());
