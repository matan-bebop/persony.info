var path = require("path");
var views = {
    getAll: function(req, res, next){
        var Entity = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "person");
        res.setHeader('Content-Type', 'application/json');
        Entity.findAll({}).success(function(entity) {
            if(entity){
                res.end(JSON.stringify(entity));
            }else{
                res.send(404, "Nothing found");
            }
        })
    },
    getEntity: function(req, res, next){
        Entity = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "person");
        res.setHeader('Content-Type', 'application/json');
        /* */
        if(req.params.id){
            Entity.find({ where: {id: req.params.id} }).success(function(entity) {
                if(entity){
                    res.end(JSON.stringify(entity));
                }else{
                    res.send(404, "Nothing found");
                }
            });
        }else{
            res.end(JSON.stringify({}));
        }
    },
    getEntitySearch: function(req, res, next){
        Entity = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "person");
        res.setHeader('Content-Type', 'application/json');
        /* */
        if(req.param("query")){
            Entity.findAndCountAll({ where: ["name LIKE '%"+req.param("query")+"%'"]}).success(function(result) {
                if(result.rows){
                    res.end(JSON.stringify(result.rows));
                }else{
                    res.end(JSON.stringify([]));
                }
            });
        }else{
            res.end(JSON.stringify([]));
        }
    },
    updateEntity: function(req, res){
        var models = req.app.get("models");
        var Entity = models.import(__dirname + path.sep + "models" + path.sep +  "person");
        res.setHeader('Content-Type', 'application/json');
        /* */
        var id = req.param('id');

        var form_data = {};
        (req.param('name')?form_data.name = req.param('name'):"");
        (req.param('photo')?form_data.photo = req.param('photo'):"");
        (req.param('info')?form_data.info = req.param('info'):"");
        (req.param('facebook')?form_data.facebook = req.param('facebook'):"");
        (req.param('twitter')?form_data.twitter = req.param('twitter'):"");
        if(id){
            Entity.findOrCreate({id : id}).success(function(entity) {
                if(entity){
                    entity.updateAttributes(form_data).success(function(entity) {
                        res.end(JSON.stringify({status: "ok"}));
                    })
                }
            })
        }else{
            Entity.create(form_data).success(function(entity) {
                if(entity){
                    res.end(JSON.stringify({status: "ok"}));
                }
            })
        }
    },
    removeEntity: function(req, res){
        var Entity = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "person");
        res.setHeader('Content-Type', 'application/json');
        if(req.user.is_moderator){
            Entity.find({ where: {id: req.params.id}}).success(function(entity) {
                if(entity){
                    entity.destroy().success(function() {
                        res.end(JSON.stringify({status: "ok"}));
                    })
                }else{
                    res.end(JSON.stringify({status: "error"}));
                }
            })
        }else{
            res.end(JSON.stringify({status: "Unauthorized"}));
        }
    }
};

exports.views = views;
