var path = require("path");
var views = {
    getEntity: function(req, res, next){
        Event = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
        res.setHeader('Content-Type', 'application/json');
        /* */
        if(req.params.id){
            Event.findAll({ where: {id: req.params.id},  limit: 100 }).success(function(entity) {
                if(entity){
                    res.end(JSON.stringify(entity));
                }else{
                    res.send(404, "Nothing found");
                }
            })
        }
    },
    getRelatedEntity: function(req, res, next){
        Event = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
        res.setHeader('Content-Type', 'application/json');
        /* */
        if(req.params.personid){
            Event.getPersons({ where: { limit: 100 }}).success(function(entities) {
                res.end(JSON.stringify(entities));
            })
        }
    },
    updateEntity: function(req, res){
        Entity = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
        res.setHeader('Content-Type', 'application/json');
        /* form TODO Add forms */
        var form_data = {};
        (req.param('id')?form_data.id = req.param('id'):"");
        (req.param('eventUri')?form_data.eventUri = req.param('eventUri'):"");
        (req.param('start')?form_data.start = req.param('start'):"");
        (req.param('end')?form_data.end = req.param('end'):"");
        (req.param('title')?form_data.title = req.param('title'):"");
        (req.param('fulltext')?form_data.fulltext = req.param('fulltext'):"");
        if(req.param('id')){
            Entity.find({ where: {id: req.param('id')},  limit: 100 }).success(function(entity) {
                entity.updateAttributes(form_data).success(function(entity) {
                    res.end(JSON.stringify({status: "ok"}));
                });
            })
        }else{
            Entity.create(form_data).success(function(entity) {
                res.end(JSON.stringify({status: "ok"}));
            })
        }


    },
    removeEntity: function(req, res){
        Entity = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
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
    },
    updateRelation : function(req, res){
        Event = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
        Person = req.app.get("models").import(".."+ path.sep + "person"+ path.sep + "models"+ path.sep + "person");

        Event.hasMany(Person, {as : "Person"});
        Person.hasMany(Event);

        res.setHeader('Content-Type', 'application/json');
        /* form TODO Add forms */

        var form_data = {};
        (req.param('eventId')?form_data.eventId = req.param('eventId'):"");
        (req.param('personaId')?form_data.personaId = req.param('personaId'):"");

        if(form_data.eventId && form_data.personaId){
            Event.find(form_data.eventId).success(function(event) {
                if(event){
                    Person.find(form_data.personaId).success(function(person) {
                        if(person){
                            event.addPersona(person).success(function(person) {
                                res.end(JSON.stringify({status: "ok"}));
                            })
                        }
                    });
                }
            });
        }
    },
    /* TODO FIX REMOVE RELATION */
    removeRelation: function(req, res){
        Event = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
        Person = req.app.get("models").import(".."+ path.sep + "person"+ path.sep + "models"+ path.sep + "person");

        Event.hasMany(Person, {as : "Person"});
        Person.hasMany(Event);

        res.setHeader('Content-Type', 'application/json');
        var form_data = {};
        (req.param('eventId')?form_data.eventId = req.param('eventId'):"");
        (req.param('personaId')?form_data.personaId = req.param('personaId'):"");

        if(form_data.eventId && form_data.personaId){
            Event.find(form_data.eventId).success(function(event) {
                if(event){
                    Person.find(form_data.personaId).success(function(person) {
                        if(person){
                            event.removePerson({ where: {id : form_data.personaId}}).success(function(person) {
                                res.end(JSON.stringify({status: "removed"}));
                            })
                        }
                    });


                }
            });
        }
    }
};

exports.views = views;
