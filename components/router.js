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
    // "update" controller should not be accessible via "post" actually,
    // but Angular Resource uses same url for "create" and "update" and we want to support it
    app.post("/api/events/:id", controllers.event.save);
    app.put("/api/events/:id", controllers.event.save);
    app.delete("/api/events/:id", controllers.event.delete);

    // Persons
    app.get("/api/persons", controllers.person.query);
    app.get("/api/persons/:name", controllers.person.get);

    app.post("/contact/:formName", controllers.frontend.contact);
    // frontend urls which are handled by AngularJS
    app.get(/^\/(about|p|all|)?\/?\d*$/, controllers.frontend.index);
    app.get("/partials/*", controllers.frontend.partials);

    // Errors handling
    app.use(controllers.api.errorValidation);
    app.use(controllers.frontend.error404);
    app.use(controllers.frontend.error500);
};
