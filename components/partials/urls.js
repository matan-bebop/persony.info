var views = require("./views").views;

exports.dispatch = function(app){
    return [
       {"/partials/*" :  {
         "get": [views.partials, false]
        }}
    ]
};
