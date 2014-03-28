'use strict';

var path = require('path');

module.exports = function (app) {
    var Sequelize = require('sequelize'),
        settings = app.require('/config/settings').database,
        seq = new Sequelize(settings.database, settings.user, settings.password, {
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

    seq.app = app;
    seq.getModel = function (model) {
        return seq.import(
            path.join(
                app.ROOT,
                'components',
                'models',
                //seq can load model with .js extension but will misbehavior afterwards.
                path.basename(model.toLowerCase(), '.js')
            )
        );
    };
    return seq;
};
