var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/api/person" : {
            "get" : [views.getAll, "auth"],
            "post": [views.updateEntity, "auth"],
            "put" : [views.updateEntity, "auth"],
            "delete" : [views.removeEntity, "auth"]
        }},
        {"/api/person/:id" :  {
            "get": [views.getEntity, "auth"],
            "post": [views.updateEntity, "auth"],
            "put" : [views.updateEntity, "auth"],
            "delete" : [views.removeEntit, "auth"]
        }}
    ]
};
