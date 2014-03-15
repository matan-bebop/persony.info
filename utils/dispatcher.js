var settings = require("../conf/settings"),
    collectURLS = function(){
        var apps = settings.installed_apps,
            app,
            urls = [];
        for(var i= 0,l=apps.length;i<l;i++){
            app = apps[i];
            urls.push(require("../components/" + app + "/urls"));
        }
        return urls
    },
    getPath = function(obj){
        if(!obj){return "";}
        else{for(var p in obj){if(obj.hasOwnProperty(p)){return p}}}
    }, auth_mod = require("./auth"),
       auth = auth_mod.auth,
       session = auth_mod.session;

bindMethods = function(app, methods, path){
        var handler;
        for(var method in methods){
            if(methods.hasOwnProperty(method)){
                try{
                    handler = methods[method];
                    if(handler && handler[1] == "auth"){
                        app[method](path, auth, handler[0])
                    }else{
                        app[method](path, session, handler[0])
                    }
                }catch(e){}
            }
        }
    };

exports.dispatch = function(app){
    var URLS = collectURLS(),app_URL,patterns,pattern,path,methods;
    for(var i= 0,l=URLS.length;i<l;i++){
        app_URL = URLS[i];
        patterns = app_URL.dispatch();

        for(var j= 0, k=patterns.length;j<k;j++){
            pattern = patterns[j];
            path = getPath(pattern);
            methods = pattern[path];
            bindMethods(app, methods, path);
        }
    }
};
