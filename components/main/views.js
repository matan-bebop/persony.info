var path = require('path');


var views = {
    index : function(req, res) {
        res.render('index');
    },
    importFake : function(req, res) {
        var importData = require("../../utils/import_data")
        res.render('index');
    }
};
exports.views = views;
