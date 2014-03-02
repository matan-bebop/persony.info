var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/api/person/get/" :  {
            "get": views.getEntity,
            "post": views.getEntity
        }},
        {"/api/person/get/:id" :  {
            "get": views.getEntity,
            "post": views.getEntity
        }},
        {"/api/person/add/" :  {
            "get": views.createEntity,
            "post": views.createEntity
        }},
        {"/api/person/edit/:id" :  {
            "get": views.editEntity,
            "post": views.editEntity
        }},
        {"/api/person/remove/:id" :  {
            "get": views.removeEntity,
            "post": views.removeEntity
        }}
    ]
};
