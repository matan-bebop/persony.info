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

// sync models with DB
module.exports.add = function(seq, m, item){
    var _models = {};
    console.log("===========")
    console.log(models)
    models.forEach(function(model){
        _models[model] = seq.import(__dirname + path.sep + model);
        console.log(model==m)

        if(model==m){
            _models[model].create(item).success(function(item) {
                console.log("Added instance of " + m );
            })
        }
    });
};
