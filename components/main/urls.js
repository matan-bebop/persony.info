var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/*" :  {
            "get": views.index
        }},
        {"/importFake" :  {
            "get": views.importFake
        }}
    ]
};