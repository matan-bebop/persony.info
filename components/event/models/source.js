var path = require("path");
module.exports = function(seq, DataTypes) {
    var Event = require("./event")(seq, DataTypes);
    var Source = seq.define("source",
        {
            "icon": { type: DataTypes.STRING, allowNull: false},
            "title": { type: DataTypes.STRING, allowNull: false},
            "link":{ type: DataTypes.STRING, allowNull: false}
        },
        {
            instanceMethods: {
                getInfo: function() {
                    return this.info
                }
            }
        });
    Event.hasMany(Source);
    Source.hasOne(Event);
    return Source
};
