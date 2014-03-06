var path = require("path");

module.exports = function(seq, DataTypes) {
    var Person = require(".."+ path.sep + ".."+ path.sep + "person"+ path.sep + "models"+ path.sep + "person")(seq, DataTypes),
        Event = seq.define("event",
        {
            name : { type: DataTypes.STRING, allowNull: false},
            photo: {type: DataTypes.STRING, unique: true},
            info: { type: DataTypes.TEXT, allowNull: true }
        },
        {
            instanceMethods: {
                getInfo: function() {
                    return this.info
                }
            }
        });
    Event.hasOne(Person);
    Person.hasMany(Event);
    return Event
};
