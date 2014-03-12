var path = require("path");

module.exports = function(req, res, next){
    var seq = req.app.get("models"),
        session = req.cookies["connect.sess"];
    function findByToken(token, cb) {
        var User = seq.import(__dirname +path.sep + ".."+path.sep + "components" + path.sep + "user" + path.sep+ "models" + path.sep +  "user");
        User.getUser(token, cb)
    }
    if(session){
        findByToken(session, function(user){
            req.currentuser = user;
            next();
        });
    }else{
        next()
    }
};
