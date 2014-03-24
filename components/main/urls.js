'use strict';

exports.dispatch = function (app) {
    var views = app.require("/components/main/views")(app),
        settings = app.require("/conf/settings"),
        DEV_URLS = [
            {
                "/import": {
                    "get": [views.importData, false]
                }
            },
            {
                "/import_json": {
                    "get": [views.importJson, false]
                }
            },
            {
                "/related": {
                    "get": [views.importRelation, false]
                }
            }
        ],
        URLS = [
        ];

    // frontend urls which are handled by AngularJS
    app.get(/^\/(about|persons|all|)?\/?\d*$/, views.index);

    if (settings.DEBUG) {
        URLS = DEV_URLS.concat(URLS);
    }
    return URLS;
};
