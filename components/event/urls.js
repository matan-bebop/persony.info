var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/api/event/relation/" :  {
            "post": views.updateRelation,
            "put": views.updateRelation,
            "delete": views.removeRelation
        }},

        {"/api/event/person/:person_id" :  {
            "get": views.getRelatedEntity
        }},
        {"/api/event/" :  {
            "post": views.updateEntity,
            "put" : views.updateEntity,
            "delete" : views.removeEntity
        }},
        {"/api/event/:id" :  {
            "get": views.getEntity,
            "post": views.updateEntity,
            "put" : views.updateEntity,
            "delete" : views.removeEntity
        }}
    ]
};
