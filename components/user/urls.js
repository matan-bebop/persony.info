var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/auth/login" : {
            "post": [views.logIn, "auth"]
        }},

        {"/auth/logout" :  {
            "post": [views.logOut, "auth"]
        }},

        {"/auth/signup" :  {
            "post": [views.signUp, "auth"]
        }}
    ]
};
