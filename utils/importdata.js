var templates = {
    event : require("../testdata/templates/event"),
    person : require("../testdata/templates/person"),
    source : require("../testdata/templates/source")
};

var Faker = require('Faker');
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
    }, dbs = settings.database,
        fillDB = function(seq, app_model, m, items){
            var template = templates[m],
                item;
            if(typeof items == "number"){
                for(var i=0;i<items;i++){
                    item = template(Faker, 20);
                    app_model.add(seq, m, item);
                }
            }
        };

module.exports.run = function (model, items, cb) {
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
    }), _app_models;
    app_models = collectModels();
    for(var i= 0,l=app_models.length;i<l;i++){
        try{
            _app_models = require(app_models[i]);
            fillDB(seq,_app_models, model, items);
        }catch (e){}
    }
    if(cb)cb();
};
