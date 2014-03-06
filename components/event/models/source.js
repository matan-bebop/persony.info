var path = require("path");
module.exports = function(seq, DataTypes) {
    var Event = require("./event")(seq, DataTypes);

    var Source = seq.define("source",
        {
            name : { type: DataTypes.STRING, allowNull: false},
            url: {type: DataTypes.STRING, unique: true}
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
