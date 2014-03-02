var name = 'event',
    schema = {
        id : { type : "number", primary: true, serial: true },
        "start": { type: "date", time: false },
        "dailyOrder": { type: "number", rational: true, unique: true },
        "priority": { type: "number", rational: true, unique: true },
        "title": { type: 'text', required: true },
        "fulltext": { type: 'text', required: true },
        "type": { type: "enum", values: ['biography', 'operating', 'global'] },
        "group": { type: "enum", values: ['biography', 'operating', 'global'] }
    };

var register = function (orm, db, models) {
    var Entity = db.define(name, schema,
        {
            hooks: {
                beforeValidation: function () {
                    this.createdAt = new Date();
                }
            },
            validations: {
                body   : orm.enforce.ranges.length(1, 1024)
            },
            methods: {
                serialize: function () {
                    return {
                        body      : this.body
                    }
                }
            }
        },{id: "id"});
    if(models){
        models[name] = Entity;
    }
    return Entity;
};
exports.name = name;
exports.schema = schema;
exports.register = register;