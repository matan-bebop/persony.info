var port = process.env.PORT || 3000;

// number of fake items of each model
module.exports = {
    'event': 100,
    'person':20,
    'source':200,
    'associations' : [
        {
            from : {name : "event", items : 100, as : "event_id" },
            to : {name :  "person", items : 20, as : "person_id"},
            type : "ManyToMany",
            url : "http://localhost:" + port + "/api/event/relation/"
        }
    ]
};
