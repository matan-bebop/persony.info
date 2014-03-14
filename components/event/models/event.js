var path = require("path");

module.exports = function(seq, DataTypes) {
    var Person = require(".."+ path.sep + ".."+ path.sep + "person"+ path.sep + "models"+ path.sep + "person")(seq, DataTypes),
        Event = seq.define("event",
        {
            "start": { type: DataTypes.DATE, allowNull: true},
            "start_draft": { type: DataTypes.DATE, allowNull: true},

            "end": { type: DataTypes.DATE, allowNull: true},
            "end_draft": { type: DataTypes.DATE, allowNull: true},

            "title": { type: DataTypes.STRING, allowNull: true},
            "title_draft": { type: DataTypes.STRING, allowNull: true},

            "description": { type: DataTypes.TEXT, allowNull: true },
            "description_draft": { type: DataTypes.TEXT, allowNull: true },

            "created_by_key": { type: DataTypes.STRING, allowNull: true},
            "published": { type: DataTypes.BOOLEAN, allowNull: false, defaultValue : false}
        },
        {
            classMethods : {
                getPersonEvents : function(req, cb){
                    var id = req.params.person_id,user_key = "", moderator, query;
                    if(req.session_user){
                        user_key = req.session_user.session_key;
                        moderator = req.session_user.is_moderator;
                    }
                    if(id){
                        switch(moderator){
                            case (true):
                                query = "SELECT * FROM events WHERE id IN (SELECT event_id FROM person_events WHERE person_id="+ id +") ORDER BY start DESC";
                                break;
                            case (false):
                                query = "SELECT * "
                                        +"FROM events "
                                        +"WHERE "
                                        +"id IN (SELECT event_id FROM person_events WHERE person_id="+id+") "
                                        +"and published=1 ";
                                query +=(user_key?"or created_by_key='"+user_key+"' ":"");
                                query +="ORDER BY start DESC;";
                                break;
                            default : query = "SELECT * FROM events WHERE id IN (SELECT event_id FROM person_events WHERE person_id="+ id +") and published=1 ORDER BY start DESC";
                                break;
                        }
                        seq.query(query, Event).success(function(events){if(cb)cb(events);});
                    }else{
                        if(cb)cb([]);
                    }
                }
            },
            instanceMethods: {
                addSources: function(sources) {this.dataValues.sourses = sources[this.id];},
                clean: function(user) {
                    var _t = this;
                    String.prototype.endsWith = function(suffix) {return this.indexOf(suffix, this.length - suffix.length) !== -1;};
                    delete _t.dataValues.created_by_key;
                    if(!user.is_moderator){
                        Object.keys(_t.dataValues).forEach(function(key){
                            if(key.endsWith("_draft")){
                                delete _t.dataValues[key];
                            }
                        })
                    }
                }
            }
        });
    Event.hasMany(Person, {as: "Persons", foreignKey: 'event_id', through : "person_events"});
    Person.hasMany(Event, {as: "Events", foreignKey: 'person_id', through : "person_events"});
    Event.Person = Person;
    return Event
};
