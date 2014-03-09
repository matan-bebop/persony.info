module.exports = function(Faker, items){
    var icons = ['twit', 'face', 'google'];
    var icon = icons[Math.floor(Math.random()*icons.length)];
    var event = Math.floor(Math.random()*items);
    return   {
                "icon": icon,                    // Тип джерела
                "title": Faker.Lorem.sentence(),       // Заголовок тексту посилання на джерело та атрибут title в <a> тезі
                "link": Faker.Internet.domainName(),                     // Посилання на джерело
                "event_id" : event
            }
}
