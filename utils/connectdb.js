'use strict';

module.exports = function (app) {
    var Sequelize = require("sequelize"),
        settings = app.require("/conf/settings"),
        connectionSettings = settings.database,
        seq = new Sequelize(connectionSettings.database, connectionSettings.user, connectionSettings.password, {
            host: connectionSettings.host,
            port: connectionSettings.port,
            dialect: connectionSettings.protocol,
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

    seq.app = app;
    return seq;
};
