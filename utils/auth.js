var path = require("path");
var sessions = require("./sessions");
module.exports = {
    auth : function(req, res, next){
        var seq = req.app.get("models"),
            findSession = function(session_key){
                findByToken(session_key, function(user){
                    req.user = user||{};
                    next();
                });
            };
        function findByToken(session_key, cb) {
            var User = seq.import(__dirname +path.sep + ".."+path.sep + "components" + path.sep + "user" + path.sep+ "models" + path.sep +  "user");
            User.getUser(session_key, cb)
        }
        sessions.start(req, res, findSession);
    },
    session : function(req, res, next){
        sessions.start(req, res, function(session_key){next();});
    }
};
