var import_data = require("../../utils/importdata"),
    import_models = require("../../testdata/templates");

exports.views = {
    index : function(req, res) {
        res.render('index');
    },
    importData : function(req, res) {
        var ready = {};
        for(var k in import_models){
            if(import_models.hasOwnProperty(k)){
                ready[k] = false;
            }
        }
        for(var p in import_models){
            if(import_models.hasOwnProperty(p)){
                console.log("Data import::"+p);
                import_data.run(p, import_models[p], function(){
                    var done = true;
                    ready[p] = true;
                    for(var k in ready){if(ready.hasOwnProperty(k)){if(!ready[k]){done = false;}}}
                    if(done){res.end('Test data import for models completed');}
                })
            }
        }
    }
};
