'use strict';

var settings = require("../conf/settings"),
    collectURLS = function () {
        var apps = settings.installed_apps,
            app,
            urls = [],
            i,
            l;
        for (i = 0, l = apps.length; i < l; i += 1) {
            app = apps[i];
            urls.push(require("../components/" + app + "/urls"));
        }
        return urls;
    },
    getPath = function (obj) {
        var p;
        if (!obj) { return ""; }
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                return p;
            }
        }
    },
    auth_mod = require(__dirname + "/auth"),
    auth = auth_mod.auth,
    session = auth_mod.session,
    bindMethods = function (app, methods, path) {
        var handler, method;
        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                try {
                    handler = methods[method];
                    if (handler && handler[1] === "auth") {
                        app[method](path, auth, handler[0]);
                    } else {
                        app[method](path, session, handler[0]);
                    }
                } catch (e) {}
            }
        }
    };

exports.dispatch = function (app) {
    var URLS = collectURLS(), app_URL, patterns, pattern, path, methods, i, l, j, k;
    for (i = 0, l = URLS.length; i < l; i += 1) {
        app_URL = URLS[i];
        patterns = app_URL.dispatch(app);

        for (j = 0, k = patterns.length; j < k; j += 1) {
            pattern = patterns[j];
            path = getPath(pattern);
            methods = pattern[path];
            bindMethods(app, methods, path);
        }
    }
};
