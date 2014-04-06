'use strict';

/**
 * @param app
 */
module.exports = function (app) {
    var controllers = {
        api: app.require('/components/controllers/api')(app),
        event: app.require('/components/controllers/event')(app),
        person: app.require('/components/controllers/person')(app),
        frontend: app.require('/components/controllers/frontend')(app)
    };

    // Events
    app.get("/api/events", controllers.event.query);
    app.get("/api/events/:id", controllers.event.get);
    app.post("/api/events", controllers.event.save);
    app.put("/api/events/:id", controllers.event.save);
    app.delete("/api/events/:id", controllers.event.delete);

    // Persons
    app.get("/api/persons", controllers.person.query);
    app.get("/api/persons/:id", controllers.person.get);

    // frontend urls which are handled by AngularJS
    app.get(/^\/(about|persons|all|)?\/?\d*$/, controllers.frontend.index);
    app.get("/partials/*", controllers.frontend.partials);

    // Errors handling
    app.use(controllers.api.errorValidation);
    app.use(controllers.frontend.error404);
    app.use(controllers.frontend.error500);
};