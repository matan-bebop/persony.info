var Sequelize = require("sequelize"),
    settings = require("../conf/settings"),
    path = require("path"),
    collectModels = function(){
        var apps = settings.installed_apps, app,
            models = [];
        for(var i= 0,l=apps.length;i<l;i++){
            app = apps[i];
            models.push(".." + path.sep + "components" + path.sep + app + path.sep + "models");
        }
        return models
    }, dbs = settings.database;

(function () {
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
            timestamps: false
        },
        sync: { force: true },
        pool: { maxConnections: 5, maxIdleTime: 30}
    }), _app_models, app_models = collectModels();

    for(var i= 0,l=app_models.length;i<l;i++){
        try{
            _app_models = require(app_models[i]).sync(seq);
        }catch (e){}
    }

})();
