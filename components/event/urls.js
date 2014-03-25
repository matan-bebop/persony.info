'use strict';

exports.dispatch = function (app) {
    var views = require(__dirname + "/views")(app);

    return [
        {"/api/events/relation/": {
            "post": [views.updateRelation, "auth"],
            "put": [views.updateRelation, "auth"],
            "delete": [views.removeRelation, "auth"]
        }},
        {"/api/events": {
            "get": [views.getAll, false],
            "post": [views.updateEntity, "auth"],
            "put": [views.updateEntity, "auth"],
            "delete": [views.removeEntity, "auth"]
        }},
        {"/api/events/:id": {
            "get": [views.getEntity, "auth"],
            "post": [views.updateEntity, "auth"],
            "put": [views.updateEntity, "auth"],
            "delete": [views.removeEntity, "auth"]
        }}
    ];
};
