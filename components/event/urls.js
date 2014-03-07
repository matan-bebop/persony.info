var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/event/person/" :  {
            "put": views.updateRelation,
            "delete": views.removeRelation
        }},

        {"/event/person/:personid" :  {
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
