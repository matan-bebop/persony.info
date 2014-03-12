var path = require("path");
var key = require(__dirname+ path.sep + ".."+ path.sep + ".."+ path.sep + ".."+ path.sep + "conf" + path.sep + "settings").security_key,
    crypto = require('crypto'),
    algorithm = 'aes-128-cbc',
    _encrypt = function (data){
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64'; // hex, base64
        var cipher = crypto.createCipher(algorithm, key);
        var cipherChunks = [];
        try{
            cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
            cipherChunks.push(cipher.final(cipherEncoding));
        }catch (e){console.log(e)}
        return (cipherChunks)
    },
    _uniqueid = function(){
        var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
        do {
            var ascicode=Math.floor((Math.random()*42)+48);
            if (ascicode<58 || ascicode>64){
                idstr+=String.fromCharCode(ascicode);
            }
        } while (idstr.length<32);
        return (idstr);
    };

module.exports = function(seq, DataTypes) {
    var User = seq.define("user",
        {
            "username": {type: DataTypes.STRING, allowNull: true},
            "token": {type: DataTypes.STRING, allowNull: false}
        },
        {
            tableName : "users",
            classMethods: {
                getUser: function(token, cb){
                    var query = 'SELECT * FROM users where token = "'+ token + '"';
                    seq.query(query, User)
                        .success(function(users){
                            if(users && users.length){
                                if(cb)cb(users[0]);
                            }else{
                                var UID = "user_" + _uniqueid();
                                User.create({"username": UID, token: token}).success(function(user){
                                    if(cb)cb(users[0]);
                                });
                            }
                        });
                }
            }
        });
    return User
};
