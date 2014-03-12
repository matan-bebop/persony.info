var dispatcher = require("./dispatcher");
exports.handle = function(app, passport){
    dispatcher.dispatch(app, passport);
};
