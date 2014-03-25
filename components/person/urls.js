'use strict';

exports.dispatch = function (app) {
    var views = require(__dirname + "/views")(app);

    return [
        {"/api/persons/search": {
            "get": [views.getEntitySearch, false]
        }},
        {"/api/persons": {
            "get": [views.getAll, false],
            "post": [views.updateEntity, "auth"],
            "put": [views.updateEntity, "auth"],
            "delete": [views.removeEntity, "auth"]
        }},

        {"/api/persons/:id": {
            "get": [views.getEntity, false],
            "post": [views.updateEntity, "auth"],
            "put": [views.updateEntity, "auth"],
            "delete": [views.removeEntit, "auth"]
        }}
    ];
};
