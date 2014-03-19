'use strict';

var path = require("path"),
    _ = require("lodash");

var views = {
    getEntity: function (req, res, next) {
        var models = req.app.get("models"),
            Event = models['import'](__dirname + path.sep + "models" + path.sep + "event"),
            Source = models['import'](__dirname + path.sep + "models" + path.sep + "source");
        res.setHeader('Content-Type', 'application/json');
        /* */
        if (req.params.id) {
            Event.find({ where: {id: req.params.id}, limit: 100 }).success(
                function (entity) {
                    if (entity) {
                        Source.getRelatedEvents(entity, req.user, function () {
                            res.end(JSON.stringify(entity));
                        });
                    } else {
                        res.send(404, "Nothing found");
                    }
                }
            );
        }
    },
    getRelatedEntity: function (req, res, next) {
        var models = req.app.get("models"),
            dataResFormat = req.query.data_format || "hash",
            Event = models['import'](__dirname + path.sep + "models" + path.sep + "event"),
            Source = models['import'](__dirname + path.sep + "models" + path.sep + "source");

        res.setHeader('Content-Type', 'application/json');

        if (req.params.person_id) {
            Event.getPersonEvents(req, function (entities) {
                Source.getRelatedEvents(entities, req.user, function () {
                    var data = {}, tmp = [];

                    entities.forEach(function (event) {
                        event.clean(req.user);

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

                    if (dataResFormat === "array") {
                        Object.keys(data).forEach(function (year) {
                            var months = data[year];
                            tmp.push({year: year, months: []});

                            Object.keys(months).forEach(function (month) {
                                var events = months[month];
                                tmp[tmp.length - 1].months.push({month: month, events: events.reverse()});
                            });
                        });

                        data = tmp;
                        data.reverse();
                        data.forEach(function (yearData) {
                            yearData.months.reverse();
                        });
                    }

                    res.end(JSON.stringify(data));
                });
            });
        } else {
            res.end(JSON.stringify({}));
        }
    },
    updateEntity: function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        var Entity = req.app.get("models")['import'](__dirname + path.sep + "models" + path.sep + "event"),
            user = req.user,
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
                Entity.find({ where: {id: req.param('id')}}).success(function (entity) {
                    if (entity) {
                        entity.updateAttributes(form_data).success(function (entity) {
                            res.end(JSON.stringify({status: "ok"}));
                        });
                    } else {
                        Entity.create(form_data).success(function (entity) {
                            res.end(JSON.stringify({status: "ok"}));
                        });
                    }
                });
            } else {
                Entity.create(form_data).success(function (entity) {
                    res.end(JSON.stringify({status: "ok"}));
                });
            }
        } else {
            suff = "_draft";
            if (req.param('start')) {form_data["start" + suff] = req.param('start'); }
            if (req.param('end')) {form_data["end" + suff] = req.param('end'); }
            if (req.param('title')) {form_data["title" + suff] = req.param('title'); }
            if (req.param('description')) {form_data["description" + suff] = req.param('description'); }
            Entity.create(form_data).success(function (entity) {
                res.end(JSON.stringify({status: "ok"}));
            });
        }
    },
    removeEntity: function (req, res) {
        var Entity = req.app.get("models")['import'](__dirname + path.sep + "models" + path.sep + "event");
        res.setHeader('Content-Type', 'application/json');
        Entity.find({ where: {id: req.params.id}}).success(function (entity) {
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
        var Event = req.app.get("models")['import'](__dirname + path.sep + "models" + path.sep + "event"),
            Person = Event.Person,
            form_data = {};

        res.setHeader('Content-Type', 'application/json');

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
        var Event = req.app.get("models")['import'](__dirname + path.sep + "models" + path.sep + "event"),
            form_data = {};
        res.setHeader('Content-Type', 'application/json');
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

exports.views = views;
