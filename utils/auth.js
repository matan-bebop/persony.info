var path = require("path");
var sessions = require("./sessions");
module.exports = function(req, res, next){
    var seq = req.app.get("models"),
        session_key = req.session.sid,
        findSession = function(session_key){
            req.session.sid = session_key;
            findByToken(session_key, function(user){
                req.session_user = user;
                next();
            });
        };
    function findByToken(session_key, cb) {
        var User = seq.import(__dirname +path.sep + ".."+path.sep + "components" + path.sep + "user" + path.sep+ "models" + path.sep +  "user");
        User.getUser(session_key, cb)
    }
    if(!session_key){
        sessions.start(req, res, findSession)
    }else{
        findSession(session_key)
    }
};
