'use strict';

var path = require('path');

exports.views = {
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
