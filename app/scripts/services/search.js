(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Search',
        [
            '$location',
            function ($location) {
                return {
                    keyword: "",
					sortProp: "name",
                    showResults: function () {
						$location.path("/all");
                    }
                };
            }
        ]
    );
}());
