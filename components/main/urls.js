var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {
            "/import/:model" :  {
                "get": views.importData
            }
        },
        {
            "/*" :  {
                "get": views.index
            }
        }
    ]
};
