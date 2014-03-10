module.exports = function(Faker){

    var avatarsEnum = ['nayem.jpg', 'poroshenko.jpg', 'turchinov.jpg', 'tymoshenko.jpg', 'yatsenyuk.jpg', ''];

    return   {
        "name": Faker.Name.firstName()+ " " + Faker.Name.lastName(),
        "photo": avatarsEnum[Faker.random.number(7)] || '',
        "info": Faker.Lorem.paragraph(),
        "facebook": Faker.Internet.domainName(),
        "twitter": Faker.Internet.domainName()
    }
}
