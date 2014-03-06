module.exports = function(Faker, items){
    var personaId = Math.floor(Math.random()*items);
    return   {
        "personaId": personaId,
        "eventUri": Faker.Internet.domainName(),                       // ідентифікатор події щоб була змога в майбутньому перейти по урл типу http://persony.info/naiem/#interview
        "start": Faker.Date.past(10, 1),                     // Дата події (початок)
        "end": Faker.Date.past(5, 1),                       // Дата події (кінець)
        "title": Faker.Lorem.sentence(),                 // Заголовок події
        "fulltext": Faker.Lorem.paragraphs()  // Детальний опис події а PML форматі
    }
}
