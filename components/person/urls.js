var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/api/person" : {
            "get" : views.getAll
        }},
        {"/api/person/:id" :  {
            "get": views.getEntity,
            "post": views.updateEntity,
            "put" : views.updateEntity,
            "delete" : views.removeEntity
        }}
    ]
};
