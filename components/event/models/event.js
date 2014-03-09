var path = require("path");

module.exports = function(seq, DataTypes) {
    var Person = require(".."+ path.sep + ".."+ path.sep + "person"+ path.sep + "models"+ path.sep + "person")(seq, DataTypes),
        Event = seq.define("event",
        {
            "event_uri": { type: DataTypes.STRING, allowNull: false},    // ідентифікатор події щоб була змога в майбутньому перейти по урл типу http://persony.info/naiem/#interview
            "start": { type: DataTypes.DATE, allowNull: false},          // Дата події (початок)
            "end": { type: DataTypes.DATE, allowNull: true},             // Дата події (кінець)
            "title": { type: DataTypes.STRING, allowNull: false},         // Заголовок події
            "description": { type: DataTypes.TEXT, allowNull: true }      // Детальний опис події а PML форматі
        },
        {
            instanceMethods: {
                getSources: function() {
                    var sourses = require("."+ path.sep + "source")(seq, DataTypes);

                    return this.description
                }
            }
        });
    Event.hasMany(Person, {as: "Persons", foreignKey: 'event_id', through : "person_events"});
    Person.hasMany(Event, {as: "Events", foreignKey: 'person_id', through : "person_events"});
    Event.Person = Person;
    return Event
};
