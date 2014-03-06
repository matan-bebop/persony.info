module.exports = function(Faker){
    return   {
        "name": Faker.Name.firstName()+ " " + Faker.Name.lastName(),
        "photo": Faker.Image.imageUrl(),
        "info": Faker.Lorem.paragraph(),
        "facebook": Faker.Internet.domainName(),
        "twitter": Faker.Internet.domainName()
    }
}
