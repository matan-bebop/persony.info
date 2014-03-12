var path = require("path");

module.exports = function(seq, DataTypes) {
    var Person = require(".."+ path.sep + ".."+ path.sep + "person"+ path.sep + "models"+ path.sep + "person")(seq, DataTypes),
        Event = seq.define("event",
        {
            "event_uri": { type: DataTypes.STRING, allowNull: false},    // ідентифікатор події щоб була змога в майбутньому перейти по урл типу http://persony.info/naiem/#interview
            "start": { type: DataTypes.DATE, allowNull: false},          // Дата події (початок)
            "end": { type: DataTypes.DATE, allowNull: true},             // Дата події (кінець)
            "title": { type: DataTypes.STRING, allowNull: false},         // Заголовок події
            "description": { type: DataTypes.TEXT, allowNull: true },      // Детальний опис події а PML форматі
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
                clean: function() {delete this.dataValues.created_by_key}
            }
        });
    Event.hasMany(Person, {as: "Persons", foreignKey: 'event_id', through : "person_events"});
    Person.hasMany(Event, {as: "Events", foreignKey: 'person_id', through : "person_events"});
    Event.Person = Person;
    return Event
};
