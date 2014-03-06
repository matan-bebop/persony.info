module.exports = function(Faker){
    return {                               // Картинка до події
        "alt": Faker.Lorem.sentence(),     // Заголовок тексту посилання на джерело
        "uriThumb": Faker.Image.imageUrl(), // Де знаходиться картинка маленького розміру
        "uri": Faker.Image.imageUrl() // Де знаходиться картинка великого розміру
    }
}
