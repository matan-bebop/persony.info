'use strict';

/**
 * @param app
 */
module.exports = function (app) {
    var controllers = {
        event: app.require('/components/controllers/event')(app),
        person: app.require('/components/controllers/person')(app),
        frontend: app.require('/components/controllers/frontend')(app)
    };

    app.get("/api/events", controllers.event.query);
    app.get("/api/events/:id", controllers.event.get);
    app.post("/api/events", controllers.event.save);
    app.put("/api/events", controllers.event.save);

    app.get("/api/persons", controllers.person.query);
    app.get("/api/person/:id", controllers.person.get);

    // frontend urls which are handled by AngularJS
    app.get(/^\/(about|persons|all|)?\/?\d*$/, controllers.frontend.index);
    app.get("/partials/*", controllers.frontend.partials);

    // Errors handling
    app.use(controllers.frontend.error404);
    app.use(controllers.frontend.error500);
};