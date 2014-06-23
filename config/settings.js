/*
Any settings may be overridden in __dirname + '/settings.local.js' file.
Persist with same object structure. Everything that does not require override may be omitted
For example:
 module.exports = {
     database   : {
      user     : "root",
      password : "my_root_password"
    }
 };
*/
var settings = {
    DEBUG:        true,
    server:       {
        host: '0.0.0.0',
        port: 3000
    },
    compass:      {
        project: [__dirname, '..', 'app'].join('/'),
        sass:    'styles/sass',
        css:     'styles/compiled',
        //config:  'styles/sass/config.rb',
        logging: true
    },
    database:     {
        protocol: "mysql",
        query:    { pool: true },
        host:     "127.0.0.1",
        database: "personDB",
        user:     "root",
        password: "mysql"
    },
    security_key: "GcDesWWD5cHcuN1TYJwv,dWW+IE7LNgS0UTRD4EAlSdo==",
    mail:         {
        contacts: {
            support:    'hurtom@persony.info',
            developer:  'hurtom@persony.info',
            author:     'hurtom@persony.info',
            cooperator: 'hurtom@persony.info',
            questioner: 'hurtom@persony.info'
        },

        transport: {
            service: "Zoho",
            auth:    {
                user: "hurtom@persony.info",
                pass: "strashnatajemnycja"
            }
        }
    }
};

var localConfigFile = __dirname + '/settings.local.js';

/*jslint node: true, stupid: true */
if (require('fs').existsSync(localConfigFile)) {
    require('node.extend')(true, settings, require(localConfigFile));
}
module.exports = settings;
