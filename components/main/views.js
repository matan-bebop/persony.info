var import_data = require("../../utils/import_data");

exports.views = {
    index : function(req, res) {
        res.render('index');
    },
    importData : function(req, res) {
        if(req.params.model){
            import_data.run(req.params.model, function(){
                res.end('Test data import complete');
            })
        }else{
            res.end('Provide model name');
        }
    }
};
