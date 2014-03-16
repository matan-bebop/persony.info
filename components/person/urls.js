var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/api/person/search" : {
            "get" : [views.getEntitySearch, false]
        }},
        {"/api/person" : {
            "get" : [views.getAll, false],
            "post": [views.updateEntity, "auth"],
            "put" : [views.updateEntity, "auth"],
            "delete" : [views.removeEntity, "auth"]
        }},

        {"/api/person/:id" :  {
            "get": [views.getEntity, false],
            "post": [views.updateEntity, "auth"],
            "put" : [views.updateEntity, "auth"],
            "delete" : [views.removeEntit, "auth"]
        }}
    ]
};
