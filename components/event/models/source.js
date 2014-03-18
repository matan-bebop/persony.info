var path = require("path");
module.exports = function(seq, DataTypes) {
    var Event = require("./event")(seq, DataTypes);
    var Source = seq.define("source",
        {
            "icon": { type: DataTypes.ENUM('info',
                                            'video-camera',
                                            'microphone',
                                            'file-text',
                                            'twitter',
                                            'facebook',
                                            'vk',
                                            'google-plus',
                                            'paperclip',
                                            'link'), allowNull: false, defaultValue : "info"},
            "title": { type: DataTypes.STRING, allowNull: false},
            "link":{ type: DataTypes.STRING, allowNull: false}
        },
        {
            classMethods: {
                getRelatedEvents: function(events, user, cb){
                    if(!events.length && events){
                        events = [events]
                    }

                    var query = 'SELECT * FROM sources where event_id in (';
                    events.forEach(function(event, index, arr){
                        if(index != 0){query += ",";}
                        query += event.id;
                        if(index == arr.length-1){query += ");"}
                    });
                    seq.query(query, Source)
                        .success(function(srs){
                            var sourted = {};
                            srs.forEach(function(source){
                                var id = source.event_id;
                                if(!sourted[id]){sourted[id] = []}
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
