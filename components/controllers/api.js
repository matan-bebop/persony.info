'use strict';

var path = require('path');

module.exports = function (app) {
    return {
        errorValidation: function (err, req, res, next) {
            if (req.isApiRequest && err.type === 'validation') {
                res.status(400, 'Validation Error');
                res.send({error: err});
                return;
            }
            return next();
        }
    };
};
