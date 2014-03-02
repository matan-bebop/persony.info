var orm = require('orm');
var mysql  = require("mysql");
var settings = require("../conf/settings"),
    collectModels = function(){
        var apps = settings.installed_apps, app,
            models = [];
        for(var i= 0,l=apps.length;i<l;i++){
            app = apps[i];
            models.push("../components/" + app + "/models");
        }
        return models
    };

var Sync  = require("sql-ddl-sync").Sync;

orm.connect(settings.database, function (err, db) {
    if (err) throw err;
    var driver = db.driver;
    var model;
    var app_models = collectModels(),
        sync = new Sync({
            db : driver.db,
            dialect : "mysql",
            driver  : driver,
            debug   : function (text) {
                console.log("> %s", text);
            }
        });
        for(var i= 0,l=app_models.length;i<l;i++){
            try{
                model = require(app_models[i]);
                if(model.name){
                    sync.defineCollection(model.name, model.schema);
                }
            }catch (e){}
        }
        sync.sync(function (err) {
            if (err) {
                console.log("> Sync Error");
                console.log(err);
            } else {
                console.log("> Sync Done");
            }
            process.exit(0);
        });
});