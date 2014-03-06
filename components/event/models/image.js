var path = require("path");
module.exports = function(seq, DataTypes) {
    var Source = require("./source")(seq, DataTypes);
    var Image = seq.define("image",
        {
            "alt": { type: DataTypes.STRING, allowNull: false},
            "uriThumb": { type: DataTypes.STRING, allowNull: false},
            "uri":{ type: DataTypes.STRING, allowNull: false}
        },
        {
            instanceMethods: {
                getURL: function() {
                    return this.uri
                }
            }
        });

    Source.hasMany(Image);
    Image.hasOne(Source);
    return Image
};
