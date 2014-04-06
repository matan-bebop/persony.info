'use strict';

var path = require("path"),
    _ = require("lodash"),
    async = require("async");

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
                Event.find({ where: {id: req.params.id}, include: [ Source ] }).
                    success(function (entity) {
                        if (!entity) {
                            res.status(404);
                        }
                        res.send(entity);
                    }).error(next);
            } else {
                res.send(404, null);
            }
        },

        "save": function (req, res, next) {
            app.orm.transaction(function (transaction) {
                var attributes = _(req.body).omit('sources'),
                    errorHandler = function (error) {
                        transaction.rollback().success(function () {
                            next(error);
                        });
                    };

                Event.find({ where: {id: req.params.id}, include: [ Source ] }).error(errorHandler).
                    success(function (entity) {
                        if (!entity) {
                            console.log("Creating new entity");
                            entity = Event.build(attributes);
                        } else {
                            entity.setAttributes(attributes);
                        }

                        var errors = entity.validate();

                        if (errors) {
                            errorHandler({type: "validation", errors: errors});
                        } else {
                            entity.save().error(errorHandler).success(function () {
                                var sourceIds = _(req.body.sources).pluck('id');

                                async.parallel(
                                    [
                                        //associating with provided person
                                        function (done) {
                                            if (!req.body.personId) { return done(); }

                                            Person.find(req.body.personId).error(errorHandler).success(function (person) {
                                                if (!person) { return done(); }

                                                entity.addPerson(person).error(errorHandler).success(function () {
                                                    console.log("relation created");
                                                    done();
                                                });
                                            });
                                        },
                                        // handling sources list consistency
                                        function (done) {
                                            async.each(
                                                entity.sources,
                                                function (source, callback) {
                                                    // all actual sources will be submitted in request.
                                                    // Some could have been removed in client, so here we will handle this, deleting them from database
                                                    if (sourceIds.indexOf(source.id) !== -1) { return callback(); }

                                                    source.destroy().success(function () {callback(); });
                                                },
                                                // and now update or create sources to sync them with request
                                                function () {
                                                    async.each(
                                                        req.body.sources,
                                                        function (data, callback) {
                                                            if (data.id) {
                                                                var source = _(entity.sources).findWhere({id: data.id});
                                                                if (source) {
                                                                    return source.updateAttributes(data).success(function () {callback(); });
                                                                }
                                                            }

                                                            // creating new source should not be bounded to some predefined id
                                                            delete data.id;

                                                            Source.create(data).success(function (source) {
                                                                console.log('adding source to event');
                                                                entity.addSource(source).success(function () {
                                                                    // add* call from sequelize doesn not attach association to currently pre-loaded list
                                                                    // do it manually
                                                                    entity.sources.push(source);
                                                                    callback();
                                                                });
                                                            });
                                                        },
                                                        function (err) {done(err); }
                                                    );
                                                }
                                            );
                                        }
                                    ],
                                    function (err) {
                                        if (err) {return errorHandler(err); }
                                        transaction.commit().
                                            success(function () {res.send(entity); }).
                                            error(function (error) {next(error); });
                                    }
                                );
                            });
                        }
                    });
            });
        },

        "delete": function (req, res, next) {
            Event.find(req.params.id).success(function (entity) {
                if (entity) {
                    entity.destroy().
                        success(function () {
                            res.send({});
                        }).
                        error(next);
                } else {
                    res.send({});
                }
            }).error(next);
        },

        updateRelation: function (req, res) {
            /* form TODO Add forms */
            var form_data = {};

            if (req.param('event_id')) {
                form_data.event_id = req.param('event_id');
            }
            if (req.param('person_id')) {
                form_data.person_id = req.param('person_id');
            }

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
            if (req.param('event_id')) {
                form_data.event_id = req.param('event_id');
            }
            if (req.param('person_id')) {
                form_data.person_id = req.param('person_id');
            }

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
