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
            classMethods: {
                getRelatedEvents: function(events, cb){
                    var query = 'SELECT * FROM sources where ';
                    events.forEach(function(event, index, arr){
                        if(index != 0){
                            query += " or ";
                        }
                        query += "event_id='" + event.id + "'";
                        if(index == arr.length-1){
                            query += ";"
                        }
                    });
                    seq.query(query, Source)
                        .success(function(srs){
                            var sourted = {};
                            srs.forEach(function(source){
                                var id = source.event_id;
                                if(!sourted[id]){
                                    sourted[id] = []
                                };
                                sourted[id].push(source);
                            });
                            events.forEach(function(event){
                                event.addSources(sourted);
                            });
                            if(cb)cb();
                        });
                }
            }
        });
    Event.hasMany(Source, {as: "Sources", foreignKey : "event_id"});
    Source.hasOne(Event, {as: "Event"});
    Source.Event = Event;
    return Source
};
