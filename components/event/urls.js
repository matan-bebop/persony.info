var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/api/event/relation/" :  {
            "post": [views.updateRelation, "auth"],
            "put": [views.updateRelation, "auth"],
            "delete": [views.removeRelation, "auth"]
        }},

        {"/api/event/person/:person_id" :  {
            "get": [views.getRelatedEntity, "auth"]
        }},
        {"/api/event/" :  {
            "post": [views.updateEntity, "auth"],
            "put" : [views.updateEntity, "auth"],
            "delete" : [views.removeEntity, "auth"]
        }},
        {"/api/event/:id" :  {
            "get": [views.getEntity, "auth"],
            "post": [views.updateEntity, "auth"],
            "put" : [views.updateEntity, "auth"],
            "delete" : [views.removeEntity, "auth"]
        }}
    ]
};
