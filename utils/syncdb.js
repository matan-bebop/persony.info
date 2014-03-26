'use strict';

var path = require("path"),
    app = {
        ROOT: path.join(__dirname, '/../'),
        require: function (module) {
            return require(this.ROOT + path.sep + Array.prototype.slice.call(arguments).join(path.sep));
        }
    },
    seq = app.require('/components/db-connection')(app);

/*jslint node: true, stupid: true */
require('fs').readdirSync(path.join(app.ROOT, "components", "models")).
    forEach(function (model) {
        seq.getModel(path.basename(model, '.js'));
    });

seq.sync({ force: true });