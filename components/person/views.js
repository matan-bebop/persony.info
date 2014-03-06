var Entity;
var views = {
    getEntity: function(req, res, next){
        Entity = req.app.get("models").person;
        res.setHeader('Content-Type', 'application/json');
        /* */
        if(req.params.id){
            Entity.find({ where: {id: req.params.id} }).success(function(entity) {
                if(entity){
                    res.end(JSON.stringify(entity));
                }else{
                    res.send(404, "Nothing found");
                }
            })
        }
    },
    updateEntity: function(req, res){
        Entity = req.app.get("models").person;
        res.setHeader('Content-Type', 'application/json');
        /* */
        Entity.findOrCreate({ where: {id: req.params.id}}).success(function(entity) {
            var form_data = {};
            (req.param('name')?form_data.name = req.param('name'):"");
            (req.param('photo')?form_data.photo = req.param('photo'):"");
            (req.param('info')?form_data.info = req.param('info'):"");
            (req.param('facebook')?form_data.facebook = req.param('facebook'):"");
            (req.param('twitter')?form_data.twitter = req.param('twitter'):"");
            if(entity){
                entity.updateAttributes(form_data).success(function() {
                   res.end(JSON.stringify({status: "ok"}));
                })
            }
        })
    },
    removeEntity: function(req, res){
        Entity = req.app.get("models").person;
        res.setHeader('Content-Type', 'application/json');
        Entity.find({ where: {id: req.params.id}}).success(function(entity) {
            if(entity){
                entity.destroy().success(function() {
                    res.end(JSON.stringify({status: "ok"}));
                })
            }else{
                res.end(JSON.stringify({status: "error"}));
            }
        })
    }
};

exports.views = views;
