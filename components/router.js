'use strict';

module.exports = function (app) {
    var controllers = {
        event: app.require('/components/controllers/event')(app),
        person: app.require('/components/controllers/person')(app),
        frontend: app.require('/components/controllers/frontend')(app)
    };

    app.get("/api/events", controllers.event.list);
    app.get("/api/events/:id", controllers.event.get);

    app.get("/api/persons", controllers.person.list);
    app.get("/api/person/:id", controllers.person.get);

    // frontend urls which are handled by AngularJS
    app.get(/^\/(about|persons|all|)?\/?\d*$/, controllers.frontend.index);
    app.get("/partials/*", controllers.frontend.partials);

    // Errors handling
    app.use(function (req, res, next) {
        res.status(404);

        if (req.url.substring(0, 4) === '/api') {
            res.send({ error: 'Not found' });
            return;
        }

        // respond with html page
        if (req.accepts('html')) {
            res.render('404', { url: req.url });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);

        if (req.url.substring(0, 4) === '/api') {
            res.send({ error: err });
            return;
        }

        res.render('500', { error: err });
    });
};