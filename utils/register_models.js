var Sequelize = require("sequelize");
var settings = require("../conf/settings"),
    collectModels = function(){
        var apps = settings.installed_apps, app,
            models = [];
        for(var i= 0,l=apps.length;i<l;i++){
            app = apps[i];
            models.push("../components/" + app + "/models");
        }
        return models
    }, dbs = settings.database;

module.exports = function (app) {
    var seq = new Sequelize(dbs.database, dbs.user, dbs.password, {
        host: dbs.host,
        port: dbs.port,
        dialect: dbs.protocol,
        define: {
            underscored: false,
            freezeTableName: false,
            syncOnAssociation: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        },
        sync: { force: true },
        pool: { maxConnections: 5, maxIdleTime: 30}
    }), models = {}, _app_models;
    app_models = collectModels();

    for(var i= 0,l=app_models.length;i<l;i++){
        try{
            _app_models = require(app_models[i]).register(seq);
            for(var m in _app_models){
                if(_app_models.hasOwnProperty(m)){models[m] = _app_models[m];}
            }
        }catch (e){}
    }
    app.set('models', models);
};
