var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/event/relation/" :  {
            "post": views.updateRelation,
            "put": views.updateRelation,
            "delete": views.removeRelation
        }},

        {"/event/person/:person_id" :  {
            "get": views.getRelatedEntity
        }},
        {"/event/" :  {
            "post": views.updateEntity,
            "put" : views.updateEntity,
            "delete" : views.removeEntity
        }},
        {"/event/:id" :  {
            "get": views.getEntity,
            "post": views.updateEntity,
            "put" : views.updateEntity,
            "delete" : views.removeEntity
        }}
    ]
};
