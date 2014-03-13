var path = require("path");
var key = require(__dirname+ path.sep + ".."+ path.sep + ".."+ path.sep + ".."+ path.sep + "conf" + path.sep + "settings").security_key;

module.exports = function(seq, DataTypes) {
    var User = seq.define("user",
        {
            "name": {type: DataTypes.STRING, allowNull: true},
            "session_key": {type: DataTypes.STRING, allowNull: false},
            "is_moderator" : {type: DataTypes.BOOLEAN, defaultValue: false}
        },
        {
            tableName : "users",
            classMethods: {
                getUser: function(session_key, cb){
                    var user;
                    if(session_key){
                        var query = 'SELECT * FROM users where session_key = "'+ session_key + '"';
                        seq.query(query, User)
                            .success(function(users){
                                if(users && users.length){
                                    if(cb)cb(users[0]);
                                }else{
                                    user = User.build();
                                    user.session_key = session_key;
                                    user.save().success(function(user){
                                        user.updateAttributes({name:"guest"}).success(function(user) {
                                            if(cb)cb(user);
                                        })
                                    });
                                }
                            });
                    }else{
                        if(cb)cb({});
                    }

                }
            }
        });
    return User
};
