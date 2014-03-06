var path = require("path");

module.exports = function(seq, DataTypes) {
    var Person = require(".."+ path.sep + ".."+ path.sep + "person"+ path.sep + "models"+ path.sep + "person")(seq, DataTypes),
        Event = seq.define("event",
        {
            "eventUri": { type: DataTypes.STRING, allowNull: false},                                                       // ідентифікатор події щоб була змога в майбутньому перейти по урл типу http://persony.info/naiem/#interview
            "start": { type: DataTypes.DATE, allowNull: false},                     // Дата події (початок)
            "end": { type: DataTypes.DATE, allowNull: true},                       // Дата події (кінець)
            "title": { type: DataTypes.STRING, allowNull: false},                 // Заголовок події
            "fulltext": { type: DataTypes.TEXT, allowNull: true }               // Детальний опис події а PML форматі
        },
        {
            instanceMethods: {
                getInfo: function() {
                    return this.fulltext
                }
            }
        });
    Event.hasOne(Person);
    Person.hasMany(Event);
    return Event
};
