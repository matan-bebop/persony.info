var path = require("path"),
    _ = require("lodash");
var views = {
    getEntity: function(req, res, next){
        var models = req.app.get("models")
        Event = models.import(__dirname + path.sep + "models" + path.sep +  "event");
        Source =  models.import(__dirname + path.sep + "models" + path.sep +  "source");
        res.setHeader('Content-Type', 'application/json');
        /* */
        if(req.params.id){
            Event.findAll({ where: {id: req.params.id},  limit: 100 }).success(function(entities) {
                if(entities){
                    Source.getRelatedEvents(entities, function(){
                        res.end(JSON.stringify(entities));
                    });
                }else{
                    res.send(404, "Nothing found");
                }
            })
        }
    },
    getRelatedEntity: function(req, res, next){
        var models = req.app.get("models")
        Event = models.import(__dirname + path.sep + "models" + path.sep +  "event");
        Source =  models.import(__dirname + path.sep + "models" + path.sep +  "source");
        Person = Event.Person;
        res.setHeader('Content-Type', 'application/json');
        /* */

        if(req.params.person_id){
            Person.find(req.params.person_id).success(function(person) {
                if(person){
                    person.getEvents().success(function(entities) {
                        if(entities){
                            Source.getRelatedEvents(entities, function(){
                                var data = {};
                                entities.forEach(function(event) {
                                    var date = event.get('start'),
                                        year = date.getFullYear(),
                                        month = date.getMonth();

                                    if (!data[year]) {
                                        data[year] = {};
                                    }
                                    if (!data[year][month]) {
                                        data[year][month] = [];
                                    }
                                    data[year][month].push(event);
                                });
                                res.end(JSON.stringify(data));
                            })
                        }else{
                            res.end(JSON.stringify({}));
                        }
                    });
                }else{
                    res.end(JSON.stringify({}));
                }
            });
        }else{
            res.end(JSON.stringify({}));
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
                if(entity){
                    entity.updateAttributes(form_data).success(function(entity) {
                        res.end(JSON.stringify({status: "ok"}));
                    });
                }
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
                res.end(JSON.stringify({}));
            }
        })
    },
    updateRelation : function(req, res){
        Event = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
        Person = Event.Person;

        res.setHeader('Content-Type', 'application/json');
        /* form TODO Add forms */
        var form_data = {};
        (req.param('event_id')?form_data.event_id = req.param('event_id'):"");
        (req.param('person_id')?form_data.person_id = req.param('person_id'):"");

        if(form_data.event_id && form_data.person_id){
            Event.find(form_data.event_id).success(function(event) {
                if(event){
                    Person.find(form_data.person_id).success(function(person) {
                        if(person){
                            event.addPerson(person).success(function(person) {
                                res.end(JSON.stringify({status: "ok"}));
                            });
                        }else{
                            res.end(JSON.stringify({}));
                        }
                    });
                }else{
                    res.end(JSON.stringify({}));
                }
            });
        }else{
            res.end(JSON.stringify({}));
        }
    },
    removeRelation: function(req, res){
        Event = req.app.get("models").import(__dirname + path.sep + "models" + path.sep +  "event");
        res.setHeader('Content-Type', 'application/json');
        var form_data = {};
        (req.param('event_id')?form_data.event_id = req.param('event_id'):"");
        (req.param('person_id')?form_data.person_id = req.param('person_id'):"");

        if(form_data.event_id && form_data.person_id){
            Event.find(form_data.event_id).success(function(event) {
                if(event){
                    event.getPersons().success(function(persons) {
                        var _persons = _.filter(persons, function(person){
                            return person.id != form_data.person_id;
                        });
                        event.setPersons(_persons).success(function(person) {
                            res.end(JSON.stringify({status: "ok"}));
                        });
                    });
                }else{
                    res.end(JSON.stringify({}));
                }
            });
        }
    }
};

exports.views = views;
