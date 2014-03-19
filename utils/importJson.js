var Sequelize = require("sequelize"),
    settings = require("../conf/settings"),
    dbs = settings.database,
    fs = require('fs'),
    path = require("path"),
    walk = require('walk'),
    folder,
    files = [],
    file,
    importJson = function (Person, Event, Source) {
        folder = './testdata/json';
        var walker  = walk.walk( folder, { followLinks: false });

        walker.on('file', function(root, stat, next) {
            files.push(root + '/' + stat.name);
            next();
        });

        walker.on('end', function() {
            console.log(files);
            files.forEach(function(file){
                fs.readFile(file, 'utf8', function (err,  data) {
                    var item, event, source, finished, processed = 0;
                    if (err) {
                        console.log('Error: ' + err);
                        return;
                    }
                    data = JSON.parse(data);
                    finished = function () {
                        processed += 1;
                        if (processed == data.length) {
                            console.log(file, ": processed");
                        }
                    };
                    item = {};
                    Object.keys(data).forEach(function(key){
                        if(key != "events"){
                            item[key] = data[key];
                        }
                    });
                    Person.create(item).success(function (_person) {
                        var events = data["events"], ev = {published:true};
                        if(events.length){
                            for (var i = 0, l = events.length; i < l; i++) {
                                event = events[i];
                                Object.keys(event).forEach(function(key){
                                    if(key != "sources"){
                                        ev[key] = event[key];
                                    }
                                });
                                Event.create(ev).success(function (_event) {
                                        var sources = event["sources"], sr = {};
                                        if(sources.length){
                                            for (var i = 0, l = sources.length; i < l; i++) {
                                                sr = sources[i];
                                                sr.event_id = _event.id;
                                                Source.create(sr)
                                            }
                                        }
                                        _event.addPerson(_person);
                                    });
                            }
                        }
                    });
                });
            })
        });


    };

module.exports.run = function (cb) {
    var seq = new Sequelize(dbs.database, dbs.user, dbs.password, {
        host: dbs.host,
        port: dbs.port,
        dialect: dbs.protocol,
        define: {
            underscored: false,
            freezeTableName: false,
            syncOnAssociation: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false
        },
        sync: { force: true },
        pool: { maxConnections: 5, maxIdleTime: 30}
    }),
    Person = seq.import(".." + path.sep + "components" + path.sep + "person" + path.sep + "models" + path.sep + "person"),
    Event = seq.import(".." + path.sep + "components" + path.sep + "event" + path.sep + "models" + path.sep + "event"),
    Source = seq.import(".." + path.sep + "components" + path.sep + "event" + path.sep + "models" + path.sep + "source");

    importJson(Person, Event, Source);
    if(cb)cb();
};
