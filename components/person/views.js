var orm = require('orm'),
     _ = require('lodash'),
    Entity;

var views = {
    getEntity: function(req, res, next){
        Entity = req.models.person;
        res.setHeader('Content-Type', 'application/json');
        /* */
        if(req.params.id){
            Entity.get(req.params.id, function (err, entity) {
                if (err) {
                    if (err.code == orm.ErrorCodes.NOT_FOUND) {
                        res.send(404, "Nothing found");
                    } else {
                        return next(err);
                    }
                }
                res.end(JSON.stringify(entity));
            })
        }else{

            Entity.all(function (err, entities) {
                if (err) {
                    if (err.code == orm.ErrorCodes.NOT_FOUND) {
                        res.send(404, "Nothing found");
                    } else {
                        return next(err);
                    }
                }
                res.end(JSON.stringify(entities));
            })
        }

    },
    createEntity: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        /* */
        res.end(JSON.stringify({}));
    },
    editEntity: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        /* */
        res.end(JSON.stringify({}));
    },
    removeEntity: function(req, res){
        res.setHeader('Content-Type', 'application/json');
        /* */
        res.end(JSON.stringify({}));
    }
};
exports.views = views;
