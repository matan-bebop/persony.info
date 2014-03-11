var Sequelize = require("sequelize");
var settings = require("../conf/settings"),
    dbs = settings.database;

module.exports = function (app) {
    return new Sequelize(dbs.database, dbs.user, dbs.password, {
        host: dbs.host,
        port: dbs.port,
        dialect: dbs.protocol,
        define: {
            underscored: true,
            freezeTableName: false,
            syncOnAssociation: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false
        },
        sync: { force: false },
        pool: { maxConnections: 5, maxIdleTime: 30}
    });
};
