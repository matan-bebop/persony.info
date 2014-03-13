var sessions = {};
var key = require("../conf/settings").security_key;
var crypto = require('crypto'),
    hash = function (key, salt) {
        var h = crypto.createHash('sha512');
        h.update(key);
        h.update(salt);
        return h.digest('base64').substr(0, 8);
    };
var SID_STRING = '_user_sid';
var TIMEOUT = 3*60*1000;
var MAX_HISTORY = 50;
var expired = [];
var cleanDB = function(req){
    if(expired.length<MAX_HISTORY) return;
    var seq = req.app.get("models"), actual = [];
    Object.keys(sessions).forEach(function(key){actual.push(key);});
    seq.query("DELETE FROM users WHERE session_key NOT in ('"+ actual.join("','") +"') and name='guest';").success(function(err){});
    seq.query("DELETE FROM users WHERE session_key in ('"+ expired.join("','") +"') and name='guest';").success(function(err){});
};

exports.start = function(req, res, callback) {
    var sid;
    cleanDB(req);
    var setSid = function(sid) {
        sessions[sid]['__timeout'] = Date.now() + TIMEOUT;
        req.session.sid = sid;
        callback.apply(undefined,[sid]);
    };
    var createNew = function(req, callback) {
        sid = hash(req.socket.remoteAddress + "" + Date.now(), key);
        sessions[sid] = {__timeout:Date.now() + TIMEOUT};
        callback.apply(undefined,[sid]);
    };

    if(req.session.sid != undefined) {
        sid = req.session.sid;
    } else {
        createNew(req, setSid);
        return;
    }

    if(sessions[sid] == undefined) {
        createNew(req, setSid);
    } else if(sessions[sid]['__timeout'] < Date.now()) {
        expired.push(sid);
        delete sessions[sid];
        createNew(req, setSid);
    } else {
        setSid(sid);
    }
};
