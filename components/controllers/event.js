'use strict';

var path = require("path"),
    _ = require("lodash");

module.exports = function (app) {
    var Person = app.orm.getModel('Person'),
        Event = app.orm.getModel('Event'),
        Source = app.orm.getModel('Source');
    return {
        "query": function (req, res, next) {
            var order = req.query.order ? req.query.order.split('.').join(' ') : null;

            if (req.query.personId) {
                Person.find(
                    {
                        where: {id: req.query.personId},
                        order: order,
                        include: [
                            {model: Event, include: [Source]}
                        ]
                    }
                ).success(
                    function (person) {
                        res.end(JSON.stringify(person ? person.events : []));
                    }
                );
            } else {
                Event.findAll({
                    include: [ Source ],
                    order: order
                }).success(function (events) {
                    res.end(JSON.stringify(events || []));
                });
            }
        },
        "get": function (req, res, next) {
            if (req.params.id) {
                Event.find({ where: {id: req.params.id}, include: [ Source ] }).success(
                    function (entity) {
                        res.end(JSON.stringify(entity));
                    }
                );
            } else {
                res.end(JSON.stringify(null));
            }
        },

        "save": function (req, res, next) {
            console.log(req.body);
            Event.findOrCreate({id: req.body.id}, req.body).success(function (entity, created) {
                console.log(entity, created);
//                if (!entity) {
//                    entity = Event.build();
//                }
//                entity.set(req.body);
//
//                var options;
//                entity.validate(options).success(function (errors) {
//                    console.log(errors);
//                });
//                    entity.save().success(function (entity) {
//                        res.end(JSON.stringify(entity));
//                    }).
//                        error(function () {
//                            console.log(arguments);
//                            res.status(500);
//                            res.end(JSON.stringify({error: "error"}));
//                        });
//                } else {
//                    console.log(entity);
//                    res.status(400);
//                    res.end(JSON.stringify({error: "error"}));
//                }
            });
        },


        updateEntity: function (req, res) {
            var user = req.user,
                form_data = {},
                suff = "";
            /* form TODO Add forms */
            form_data.created_by_key = req.session.sid;
            if (user.is_moderator) {
                suff = req.param('published') ? "" : "_draft";
                if (req.param('id')) {form_data.id = req.param('id'); }
                if (req.param('start')) {form_data["start" + suff] = req.param('start'); }
                if (req.param('end')) {form_data["end" + suff] = req.param('end'); }
                if (req.param('title')) {form_data["title" + suff] = req.param('title'); }
                if (req.param('description')) {form_data["description" + suff] = req.param('description'); }
                if (req.param('published')) {form_data.published = req.param('published'); }
                if (req.param('id')) {
                    Event.find({ where: {id: req.param('id')}}).success(function (entity) {
                        if (entity) {
                            entity.updateAttributes(form_data).success(function (entity) {
                                res.end(JSON.stringify({status: "ok"}));
                            });
                        } else {
                            Event.create(form_data).success(function (entity) {
                                res.end(JSON.stringify({status: "ok"}));
                            });
                        }
                    });
                } else {
                    Event.create(form_data).success(function (entity) {
                        res.end(JSON.stringify({status: "ok"}));
                    });
                }
            } else {
                suff = "_draft";
                if (req.param('start')) {form_data["start" + suff] = req.param('start'); }
                if (req.param('end')) {form_data["end" + suff] = req.param('end'); }
                if (req.param('title')) {form_data["title" + suff] = req.param('title'); }
                if (req.param('description')) {form_data["description" + suff] = req.param('description'); }
                Event.create(form_data).success(function (entity) {
                    res.end(JSON.stringify({status: "ok"}));
                });
            }
        },
        removeEntity: function (req, res) {
            Event.find({ where: {id: req.params.id}}).success(function (entity) {
                if (entity) {
                    entity.destroy().success(function () {
                        res.end(JSON.stringify({status: "ok"}));
                    });
                } else {
                    res.end(JSON.stringify({}));
                }
            });
        },
        updateRelation: function (req, res) {
            /* form TODO Add forms */
            var form_data = {};

            if (req.param('event_id')) { form_data.event_id = req.param('event_id'); }
            if (req.param('person_id')) {form_data.person_id = req.param('person_id'); }

            if (form_data.event_id && form_data.person_id) {
                Event.find(form_data.event_id).success(function (event) {
                    if (event) {
                        Person.find(form_data.person_id).success(function (person) {
                            if (person) {
                                event.addPerson(person).success(function (person) {
                                    res.end(JSON.stringify({status: "ok"}));
                                });
                            } else {
                                res.end(JSON.stringify({}));
                            }
                        });
                    } else {
                        res.end(JSON.stringify({}));
                    }
                });
            } else {
                res.end(JSON.stringify({}));
            }
        },
        removeRelation: function (req, res) {
            var form_data = {};
            if (req.param('event_id')) { form_data.event_id = req.param('event_id'); }
            if (req.param('person_id')) { form_data.person_id = req.param('person_id'); }

            if (form_data.event_id && form_data.person_id) {
                Event.find(form_data.event_id).success(function (event) {
                    if (event) {
                        event.getPersons().success(function (persons) {
                            var _persons = _.filter(persons, function (person) {
                                return person.id !== form_data.person_id;
                            });
                            event.setPersons(_persons).success(function (person) {
                                res.end(JSON.stringify({status: "ok"}));
                            });
                        });
                    } else {
                        res.end(JSON.stringify({}));
                    }
                });
            }
        }
    };
};
