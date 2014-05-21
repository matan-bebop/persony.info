/**
 * Created by yurko on 27.04.14.
 */
'use strict';

module.exports = function (seq, DataTypes) {
    return seq.define("Contact",
        {
            "type": {
                type: DataTypes.ENUM(
                    'developer',
                    'author',
                    'cooperator',
                    'questioner'
                ),
                allowNull: false
            },
            "email": { type: DataTypes.STRING, allowNull: false},
            "name": { type: DataTypes.STRING, allowNull: true},
            "skills": { type: DataTypes.STRING, allowNull: true},
            "additional": { type: DataTypes.STRING, allowNull: true},
            "profession": { type: DataTypes.STRING, allowNull: true},
            "organisation": { type: DataTypes.STRING, allowNull: true},
            "subject": { type: DataTypes.STRING, allowNull: true},
            "question": { type: DataTypes.STRING, allowNull: true}
        });
};