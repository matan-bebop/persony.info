var fs = require('fs'), file,
    orm = require('orm'),
    settings = require("../conf/settings"),
    collectModels = function () {
        var apps = settings.installed_apps, app,
            models = [];
        for (var i = 0, l = apps.length; i < l; i++) {
            app = apps[i];
            models.push(app);
        }
        return models
    },
    importEntity = function (Entity, name, finalise) {
        file = './testdata/' + name + '.json';
        fs.readFile(file, 'utf8', function (err, data) {
            var item, finished, processed = 0;
            if (err) {
                console.log('Error: ' + err);
                return;
            }
            data = JSON.parse(data);

            finished = function () {
                processed += 1;
                if (processed == data.length) {
                    console.log(name, " processed");
                    if (typeof finalise == 'function') {
                        finalise();
                    }
                }
            };

            for (var i = 0, l = data.length; i < l; i++) {
                item = data[i];

                delete item.id;
                Entity.create(item, function (err, results) {
                    if (err) {console.log(err)}
                    finished();
                });
            }
        });
    };

var connection = null;

function setup(db, cb) {
    var models = collectModels(), finished, processed = 0;

    finished = function () {
        processed += 1;
        if (processed == models.length) {
            console.log("data imported");
            // it seem to not work
            connection.close();
            process.exit();
        }
    };

    for (var i = 0, l = models.length; i < l; i++) {
        try {
            var Entity = require("../components/" + models[i] + "/models").register(orm, db);
            cb(Entity, models[i], finished);
        } catch (e) {
            console.log(e.message);
            finished();
        }
    }
}
connection = orm.connect(settings.database, function (err, db) {
    db.settings.set('instance.returnAllErrors', true);
    setup(db, importEntity);
});
