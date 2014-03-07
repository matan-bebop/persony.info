var views = require("./views").views,
    settings = require("../../conf/settings");

exports.dispatch = function(app){
    var URLS = [
            {
                "/*" :  {
                    "get": views.index
                }
            }
        ],
        DEV_URLS = [{
            "/import/" :  {
                "get": views.importData
            }
        }];
    if(settings.DEBUG){
        URLS = DEV_URLS.concat(URLS);
    }
    return URLS;
};
