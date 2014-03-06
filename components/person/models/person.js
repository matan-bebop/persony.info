var path = require("path");
module.exports = function(seq, DataTypes) {
    var Person = seq.define("persona",
        {
            name : { type: DataTypes.STRING, allowNull: false},
            photo: {type: DataTypes.STRING, unique: true},
            info: { type: DataTypes.TEXT, allowNull: true }
        },
        {
        instanceMethods: {
            getInfo: function() {
                return this.info
            }
        }
    });
    return Person
};
