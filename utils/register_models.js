var orm = require('orm');
var settings = require("../conf/settings"),
    collectModels = function(){
        var apps = settings.installed_apps, app,
            models = [];
        for(var i= 0,l=apps.length;i<l;i++){
            app = apps[i];
            models.push("../components/" + app + "/models");
        }
        return models
    },dbs = settings.database


module.exports = function (app) {
    var app_models = collectModels();
    app.use(orm.express(settings.database, {
        define: function (db, models, next) {
            db.settings.set('instance.returnAllErrors', true);
            for(var i= 0,l=app_models.length;i<l;i++){
                try{
                    require(app_models[i]).register(orm, db, models);
                }catch (e){
                   // console.log(e)
                }
            }
            next();
        }
    }));
};
