'use strict';

module.exports = function (Faker) {
    return {
        "event_uri": Faker.Internet.domainName(),                       // ідентифікатор події щоб була змога в майбутньому перейти по урл типу http://persony.info/naiem/#interview
        "start": Faker.Date.past(10, 1),                     // Дата події (початок)
        "end": Faker.Date.past(5, 1),                       // Дата події (кінець)
        "title": Faker.Lorem.sentence(),                 // Заголовок події
        "description": Faker.Lorem.paragraphs(),  // Детальний опис події а PML форматі
        "published": true,
        "image": null
    };
};
