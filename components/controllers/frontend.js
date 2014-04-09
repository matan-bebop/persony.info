'use strict';

var path = require('path');

module.exports = function (app) {
    return {
        index: function (req, res) {
            res.render('index');
        },
        partials: function (req, res) {
            var stripped = req.url.split('.')[0];
            res.render(path.join('./', stripped), function (err, html) {
                if (err) {
                    res.render('index');
                } else {
                    res.send(html);
                }
            });
        },
        error404: function (req, res, next) {
            res.status(404);

            if (req.isApiRequest) {
                res.send({ error: 'Not found' });
                return;
            }

            // respond with html page
            if (req.accepts('html')) {
                //res.render('404', { url: req.url });
                res.render('index');
                return;
            }

            // default to plain-text. send()
            res.type('txt').send('Not found');
        },
        error500: function (err, req, res, next) {
            res.status(err.status || 500);

            if (req.isApiRequest) {
                res.send({ error: err });
                return;
            }

            res.render('500', { error: err });
        }
    };
};
