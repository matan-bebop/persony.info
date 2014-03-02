var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/api/event/get/" :  {
            "get": views.getEntity,
            "post": views.getEntity
        }},
        {"/api/event/get/:id" :  {
            "get": views.getEntity,
            "post": views.getEntity
        }},
        {"/api/event/add/" :  {
            "get": views.createEntity,
            "post": views.createEntity
        }},
        {"/api/event/edit/:id" :  {
            "get": views.editEntity,
            "post": views.editEntity
        }},
        {"/api/event/remove/:id" :  {
            "get": views.removeEntity,
            "post": views.removeEntity
        }}
    ]
};
