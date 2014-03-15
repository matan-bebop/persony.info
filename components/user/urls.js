var views = require("./views").views;

exports.dispatch = function(app){
    return [
        {"/auth/me" : {
            "get": [views.currentUser, "auth"],
            "post": [views.currentUser, "auth"]
        }},

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
