var path = require('path');


var views = {
    partials : function(req, res) {
        var stripped = req.url.split('.')[0];
        var requestedView = path.join('./', stripped);
        res.render(requestedView, function(err, html) {
            if(err) {
                res.render('404');
            } else {
                res.send(html);
            }
        });
    }
};
exports.views = views;
