'use strict';

var path = require("path"),
	Pml2html = require("../pml2html");

module.exports = function (seq, DataTypes) {
    var Person = seq.getModel('Person'),
        Source = seq.getModel('Source'),
        Event = seq.define("Event",
            {
                "start": { type: DataTypes.DATE, allowNull: false},
                "end": { type: DataTypes.DATE, allowNull: true},
                "title": {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notNull: true,
                        notEmpty: true
                    }
                },
                "description": { 
					type: DataTypes.TEXT, 
					allowNull: false,
					get: function() {
						var tr = new Pml2html.Translator(seq)
						return tr.translate(this.getDataValue("description"));
					}
				},
                "published": { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
                image: {type: DataTypes.STRING, unique: false},
                "others": { type: DataTypes.TEXT, allowNull: true }
            });

    Event.hasMany(Person, {foreignKey: 'Event_id', through: "Events_Persons"});
    Person.hasMany(Event, {foreignKey: 'Person_id', through: "Events_Persons"});

    Event.hasMany(Source, {foreignKey: "Event_id"});
    Source.belongsTo(Event, {foreignKey: "Event_id"});

    return Event;
};
