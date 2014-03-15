var path = require("path");
exports.views = {
    logIn : function(req, res){
        var User = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "user");
        res.setHeader('Content-Type', 'application/json');
        var session = req.session.sid;
        if(session && !req.user.logged_in){
            var form_data = {};
            (req.param('email')?form_data.email = req.param('email'):"");
            (req.param('password')?form_data.password = req.param('password'):"");

            if(form_data.email && form_data.password){
                User.find({where : {email : form_data.email}}).success(function(user){
                    if(user && user.validPassword(form_data.password, user.password)){
                        user.logIn(session, function(){
                            res.end(JSON.stringify({
                                action: "login",
                                status: "ok"
                            }));
                        });
                    }else{
                        res.end(JSON.stringify({
                            action: "login",
                            status: "error",
                            errors : ["Check your credentials"]
                        }));
                    }
                })
            }else{
                res.end(JSON.stringify({
                    action: "login",
                    status: "error",
                    errors : ["some fields are missing"]
                }));
            }
        }else{
            res.end(JSON.stringify({
                                action: "login",
                                status: "error",
                                errors : ["You are already logged in"]
                            }));
        }
    },
    currentUser : function(req, res){
        res.setHeader('Content-Type', 'application/json');
        var user = req.user;
        if(user && user.logged_in){
            user.clean();
            res.end(JSON.stringify(user));
        }else{
            res.end(JSON.stringify({}));
        }

    },
    logOut : function(req, res){
        res.setHeader('Content-Type', 'application/json');
        var user = req.user;
        if(user && user.logged_in){
            user.logOut(function(){
                res.end(JSON.stringify({action: "logout", status: "ok"}));
            })
        }else{
            res.end(JSON.stringify({action: "logout",
                                    status: "error",
                                    errors : ["Not logged in or session expired"]}));
        }
    },
    signUp : function(req, res){
        var User = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "user");
        res.setHeader('Content-Type', 'application/json');
        var session = req.session.sid;
        if(session && !req.user.logged_in){
            var form_data = {};
            (req.param('email')?form_data.email = req.param('email'):"");
            (req.param('password')?form_data.password = req.param('password'):"");

            if(
                form_data.email &&
                form_data.password &&
                form_data.password == req.param('password_confirm')
                ){
                User.find({where : {email : form_data.email}}).success(function(user){
                    if(user && user.validPassword(form_data.password, user.password)){
                        user.logIn(session, function(){
                            res.end(JSON.stringify({
                                action: "login",
                                status: "ok"
                            }));
                        });
                    }else{
                        User.create(form_data).success(function(user){
                            if(user){
                                user.logIn(session, function(){
                                    res.end(JSON.stringify({
                                        action: "signin",
                                        status: "ok"
                                    }));
                                });
                            }else{
                                res.end(JSON.stringify({
                                    action: "login",
                                    status: "error",
                                    errors : ["Unknown error"]
                                }));
                            }
                        })
                    }
                });
            }else{
                res.end(JSON.stringify({
                    action: "login",
                    status: "error",
                    errors : ["Some fields are missing"]
                }));
            }
        }else{
            res.end(JSON.stringify({
                action: "login",
                status: "error",
                errors : ["You are already logged in"]
            }));
        }

    }
};
