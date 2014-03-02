var dispatcher = require("./../utils/dispatcher");
exports.handle = function(app){
    dispatcher.dispatch(app);
};
