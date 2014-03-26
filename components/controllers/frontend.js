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
                    res.render('404');
                } else {
                    res.send(html);
                }
            });
        }
    };
};