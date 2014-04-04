'use strict';

var path = require("path");

module.exports = function (seq, DataTypes) {
    var Person = seq.getModel('Person'),
        Source = seq.getModel('Source'),
        Event = seq.define("Event",
            {
                "start": { type: DataTypes.DATE, allowNull: false},
                "end": { type: DataTypes.DATE, allowNull: true},
                "title": { type: DataTypes.STRING, allowNull: false},
                "description": { type: DataTypes.TEXT, allowNull: false },
                "created_by_key": { type: DataTypes.STRING, allowNull: true},
                "published": { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
                image: {type: DataTypes.STRING, unique: false}
            });

    Event.hasMany(Person, {foreignKey: 'Event_id', through: "Events_Persons"});
    Person.hasMany(Event, {foreignKey: 'Person_id', through: "Events_Persons"});

    Event.hasMany(Source, {foreignKey: "Event_id"});
    Source.belongsTo(Event, {foreignKey: "Event_id"});

    return Event;
};