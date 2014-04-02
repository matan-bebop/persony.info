'use strict';

var path = require('path');

module.exports = function (app) {
    var settings = app.require('/config/settings').database;

    app.orm = new (require('sequelize'))(settings.database, settings.user, settings.password, {
        host: settings.host,
        port: settings.port,
        dialect: settings.protocol,
        define: {
            underscored: false,
            freezeTableName: false,
            syncOnAssociation: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false
        },
        sync: { force: false },
        pool: { maxConnections: 5, maxIdleTime: 30}
    });

    app.orm.app = app;

    app.orm.getModel = function (model) {
        return this.import(
            path.join(
                app.ROOT,
                'components',
                'models',
                //seq can load model with .js extension but will misbehavior afterwards.
                path.basename(model.toLowerCase(), '.js')
            )
        );
    };

    return app.orm;
};
