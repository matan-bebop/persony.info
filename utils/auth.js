var path = require("path");

module.exports = function(req, res, next){
    var seq = req.app.get("models"),
        session_key = req.cookies["_open_sid"];
    function findByToken(session_key, cb) {
        var User = seq.import(__dirname +path.sep + ".."+path.sep + "components" + path.sep + "user" + path.sep+ "models" + path.sep +  "user");
        User.getUser(session_key, cb)
    }
    if(session_key){
        findByToken(session_key, function(user){
            req.session_user = user;
            next();
        });
    }else{
        next()
    }
};
