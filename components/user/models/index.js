// load models
var path = require("path");
var models = [
    'user'
];

// register app models
module.exports.register = function(seq){
    var _models = {};
    models.forEach(function(model){
        _models[model] = seq.import(__dirname + path.sep + model);
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
// sync models with DB
module.exports.add = function(seq, m, item){
    var _models = {};
    console.log("------------------")
        models.forEach(function(model){
            _models[model] = seq.import(__dirname + path.sep + model);
            console.log(m)
            console.log(model)
            if(model==m){

                _models[model].create(item).success(function(item) {if(item){console.log("|");}})
            }
        });
};
