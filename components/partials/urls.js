'use strict';

var views = require(__dirname + "/views").views;

exports.dispatch = function (app) {
    return [
        {"/partials/*": {
            "get": [views.partials, false]
        }}
    ];
};
