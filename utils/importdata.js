var templates = {
    event : require("../testdata/templates/event"),
    person : require("../testdata/templates/person"),
    source : require("../testdata/templates/source")
    },
    associations = require("../testdata/templates/").associations,
    Request;

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
        random = function(range){return Math.floor(Math.random()*range);},
        serialize = function(obj){
            var s = "";
            Object.keys(obj).forEach(function(k){
                s+="&" + k + "=" + obj[k];
            });
            return s;
        },
        fillDB = function(seq, app_model, m, items){
            var template = templates[m],
                item;
            if(typeof items == "number"){
                for(var i=0;i<items;i++){
                    item = template(Faker, 100);
                    app_model.add(seq, m, item);
                }
            }
        }, fillByRequest = function(){
            associations.forEach(function(acc){
                var requestRun = function(req){
                    var url = req.url;
                    Request.post(url, {form : req.item}, function(data){
                        if(req.cb)req.cb(req.id);
                    });
                    }, requests = [], request = {};

                var items = acc.from.items, item;
                for(var i=0;i<items;i++){
                    request = {};
                    item = {};
                    item[acc.from.as] = random(acc.from.items);
                    item[acc.to.as] = random(acc.to.items);
                    request.id = i;
                    request.url = acc.url;
                    request.item = item;
                    requests.push(request);
                    request.cb = function(j){
                        if(requests[j+1]){
                            requestRun(requests[j+1])
                        }
                    }
                }
                requestRun(requests[0])
            })
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
    if(model != "associations"){
        for(var i= 0,l=app_models.length;i<l;i++){
            try{
                _app_models = require(app_models[i]);
                fillDB(seq,_app_models, model, items);
            }catch (e){}
        }
    }else{
        Request = require("request");
        fillByRequest();
    }
    if(cb)cb();
};
