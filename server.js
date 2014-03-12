'use strict';
// Module dependencies.
var express = require('express'),
    app = express(),
    urls = require('./utils/urls'),
    path = require('path'),
    secret = require("./conf/settings").security_key,
    models;

// Express Configuration
app.configure('development', function(){
  app.use(require('connect-livereload')());
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app/views');
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/public/views');
});

app.configure(function(){
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.cookieSession({key: "_open_sid",secret:secret}));
});

/* Database setup !important to be before url & pass definition */
app.set('models', require("./utils/connectdb")(app));

/* Init URL dispatcher */
urls.handle(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
