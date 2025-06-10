const faker = require("@faker-js/faker").fakerES;
const { Product } = require("../models");

module.exports = async () => {
  const products = [];

  for (let i = 0; i < 35; i++) {
    products.push({
      name: faker.commerce.productName(),
      content: faker.lorem.paragraphs(),
      description: faker.commerce.productDescription(),
      photo: faker.image.urlPicsumPhotos(),
      price: faker.commerce.price(1000, 5000, 0, "UY$"),
      stock: faker.number.int({ min: 0, max: 500 }),
      categoryId: faker.number.int({ min: 1, max: 8 }),
    });
  }

  await Product.bulkCreate(products);
  console.log("DB: Se corrió el seeder de Articles.");
};
