'use strict';

module.exports = function (seq, DataTypes) {
    return seq.define("Source",
        {
            "icon": {
                type: DataTypes.ENUM(
                    'info',
                    'video-camera',
                    'microphone',
                    'file-text',
                    'twitter',
                    'facebook',
                    'vk',
                    'google-plus',
                    'paperclip',
                    'link'
                ),
                allowNull: false,
                defaultValue: "info"
            },
            "title": { type: DataTypes.STRING, allowNull: false},
            "link": { type: DataTypes.STRING, allowNull: false}
        });
};
