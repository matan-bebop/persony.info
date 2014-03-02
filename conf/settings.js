var settings = {
    DEBUG : true,
    database   : {
        protocol : "mysql",
        query    : { pool: true },
        host     : "127.0.0.1",
        database : "personDB",
        user     : "root",
        password : "ketekl"
    },
    security_key : "GcDesWWD5cHcuN1TYJwv,dWW+IE7LNgS0UTRD4EAlSdo==",
    installed_apps : [
        'partials',
        'person',
        'event',
        'main'
    ]
};
module.exports = settings;


