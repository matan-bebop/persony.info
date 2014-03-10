var views = require("./views").views,
    settings = require("../../conf/settings");

exports.dispatch = function(app){
    var DEV_URLS = [{
                        "/import" :  {
                            "get": views.importData
                        }
                     },
                    {
                        "/related" :  {
                            "get": views.importRelation
                        }
                    }
                ],
        URLS = [
                {
                    "/*" :  {
                        "get": views.index
                    }
                }
            ];

    if(settings.DEBUG){
        URLS = DEV_URLS.concat(URLS);
    }
    return URLS;
};
