(function () {
    'use strict';

    angular.module('personyApp').factory(
        'Search',
        [
            '$filter', '$location', '$route', 'Navbar',
            function ($filter, $location, $route, Navbar) {
                return {
                    keyword: "",
					sortProp: "name",
                    clear: function () {
                        this.keyword = "";
						this.sortProp = "name";
                    },
                    showResults: function () {
                        Navbar.collapsed = true;

                        if ($location.path() === '/all') {
                            $route.reload();
                        } else {
                            $location.path('/all');
                        }
                    }
                };
            }
        ]
    );
}());
