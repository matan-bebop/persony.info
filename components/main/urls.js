var views = require("./views").views,
    settings = require("../../conf/settings");

exports.dispatch = function(app){
    var DEV_URLS = [{
                        "/import" :  {
                            "get": [views.importData, false]
                        }
                     },
                    {
                        "/related" :  {
                            "get": [views.importRelation, false]
                        }
                    }
                ],
        URLS = [
                {
                    "/*" :  {
                        "get": [views.index, false]
                    }
                }
            ];

    if(settings.DEBUG){
        URLS = DEV_URLS.concat(URLS);
    }
    return URLS;
};
