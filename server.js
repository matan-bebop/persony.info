'use strict';
// Module dependencies.
var express = require('express'),
    compass = require('node-compass'),
    app = express(),
    path = require('path'),
    secret = require(__dirname + "/config/settings").security_key,
    models;

app.ROOT = __dirname;
/**
 * May be used to require application components using path relative to the application root.
 * @param module string
 * @returns {*|Object}
 */
app.require = function (module) {
    return require(__dirname + path.sep + Array.prototype.slice.call(arguments).join(path.sep));
};

// Express Configuration
app.disable('strict routing');

app.configure('development', function () {
    if (process.env.LIVERELOAD) {
        app.use(require('connect-livereload')());
    }

    app.use(
        compass({
            project: [__dirname, 'app'].join('/'),
            sass: 'styles/sass',
            css: 'styles/compiled',
            logging: true
        })
    );

    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.errorHandler());
    app.set('views', __dirname + '/app/views');
});

app.configure('production', function () {
    app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/www/build/views');
});

app.configure(function () {
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.cookieSession({key: "_open_sid", secret: secret}));
});

/* Database setup !important to be before url & pass definition */
app.require("/components/db-connection")(app);

// Creates isApiRequest flag in request object that can be used later to apply proper logic
app.use(function (req, res, next) {
    req.isApiRequest = req.url.substring(0, 4) === '/api';
    return next();
});

app.require('/components/router')(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
