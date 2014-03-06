// load models
var path = require("path");
var models = [
    'person'
];

// register app models
module.exports.register = function(seq){
    var _models = {};
    models.forEach(function(model){
        _models[model] = seq.import(__dirname + path.sep + model)
    });
    return _models;
};


// sync models with DB
module.exports.sync = function(seq){
    var _models = {};
    models.forEach(function(model){
        _models[model] = seq.import(__dirname + path.sep + model);
        _models[model].sync({force: true});
    });
    return _models;
};
