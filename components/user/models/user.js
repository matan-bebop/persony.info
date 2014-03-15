var path = require("path");
var key = require(__dirname+ path.sep + ".."+ path.sep + ".."+ path.sep + ".."+ path.sep + "conf" + path.sep + "settings").security_key;
var utils = require(__dirname+ path.sep + ".."+ path.sep + "utils");

module.exports = function(seq, DataTypes) {
    var User = seq.define("user",
        {
            "email": {
                type: DataTypes.STRING,
                unique : true,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            "password" : {
                type: DataTypes.STRING,
                allowNull: false
            },
            "session_key": {type: DataTypes.STRING, allowNull: false},
            "logged_in" : {type: DataTypes.BOOLEAN, defaultValue: false},
            "is_moderator" : {type: DataTypes.BOOLEAN, defaultValue: false},
            "is_admin" : {type: DataTypes.BOOLEAN, defaultValue: false}
        },
        {
            setterMethods   : {
                password : function(val){
                    this.setDataValue('password', utils.password.hash(val))
                }
            },
            tableName : "users",
            instanceMethods : {
                validPassword : function(pass){
                    return utils.password.validate(pass, this.password);
                },
                logIn : function(session, cb){
                    this.updateAttributes(
                        {
                            "session_key": session,
                            "logged_in" : true
                        }
                    ).success(function(){if(cb)cb()});
                },
                logOut : function(cb){
                    this.updateAttributes(
                        {
                            "logged_in" : false
                        }
                    ).success(function(){if(cb)cb()});
                }
            },
            classMethods: {
                getUser: function(session_key, cb){
                    var user;
                    if(session_key){
                        var query = 'SELECT * FROM users where session_key = "'+ session_key + '";';
                        seq.query(query, User).success(function(users){
                            if(cb)cb(users[0]);
                        });
                    }else{
                        if(cb)cb({});
                    }
                }
            }
        });
    return User
};
