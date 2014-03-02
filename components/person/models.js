var name = 'person',
    schema = {
        id : { type : "number", primary: true, serial: true },
        "name" : { type: 'text', required: true },
        "photo" : { type: 'text', required: true },
        "info" : { type: 'text', required: true }
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