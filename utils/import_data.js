
var templates = {
    event : require("../testdata/templates/event"),
    person : require("../testdata/templates/person"),
    source : require("../testdata/templates/source"),
    image: require("../testdata/templates/image")
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
        fillDB = function(seq, app_model, m, items, arg){
            var template = templates[m],
                item;
            for(var i=0;i<items;i++){
                item = template(Faker, items);
                app_model.add(seq, m, item);
            }
        };


module.exports.run = function (model, cb) {
    console.log("Import Started")
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
    }), _app_models;
    app_models = collectModels();
    for(var i= 0,l=app_models.length;i<l;i++){
        try{
            console.log("-----")
            console.log(model)
            console.log(app_models[i])
            _app_models = require(app_models[i]);
            fillDB(seq, _app_models, model, 100);
        }catch (e){
            console.log(e)
        }
    }
    if(cb)cb();
};
