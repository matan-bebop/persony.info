var dispatcher = require("./dispatcher");
exports.handle = function(app){
    dispatcher.dispatch(app);
};
