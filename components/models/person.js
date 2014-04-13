'use strict';

module.exports = function (seq, DataTypes) {
    var Person = seq.define("Person",
        {
            name: { type: DataTypes.STRING, allowNull: false},
            photo: {type: DataTypes.STRING, unique: false},
            info: { type: DataTypes.TEXT, allowNull: false },
            facebook: { type: DataTypes.STRING, allowNull: true},
            twitter: { type: DataTypes.STRING, allowNull: true},
            twitterViewId: { type: DataTypes.STRING, allowNull: true},
            isFeatured: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
        },
        {
            instanceMethods: {
                getInfo: function () {
                    return this.info;
                }
            }
        });
    return Person;
};
