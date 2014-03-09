var path = require("path");
module.exports = function(seq, DataTypes) {
    var Event = require("./event")(seq, DataTypes);
    var Source = seq.define("source",
        {
            "icon": { type: DataTypes.STRING, allowNull: false},
            "title": { type: DataTypes.STRING, allowNull: false},
            "link":{ type: DataTypes.STRING, allowNull: false}
        },
        {});
    Event.hasMany(Source, {as: "Sources", foreignKey : "event_id"});
    Source.hasOne(Event, {as: "Event"});
    Source.Event = Event;
    return Source
};
