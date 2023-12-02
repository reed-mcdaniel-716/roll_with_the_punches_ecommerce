const { faker } = require("@faker-js/faker");
const {
  productBrands,
  productColors,
  productSizes,
  productDescriptor,
} = require("./types.ts");

const user1 = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
  created_at: faker.date.future(),
  updated_at: faker.date.future(),
};

console.log(JSON.stringify(user1));

const user2 = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
  created_at: faker.date.future(),
  updated_at: faker.date.future(),
};

console.log(JSON.stringify(user2));

const productBrand1 = faker.helpers.enumValue(productBrands);
const productColor1 = faker.helpers.enumValue(productColors);

const product1 = {
  id: faker.string.uuid(),
  name: `${productBrand1} ${faker.helpers.enumValue(productDescriptor)} Gloves`,
  size: "16oz",
  brand: productBrand1,
  color: productColor1,
  description: `${productBrand1}'s best 160z gloves`,
};

console.log(JSON.stringify(product1));

const productBrand2 = faker.helpers.enumValue(productBrands);
const productColor2 = faker.helpers.enumValue(productColors);

const product2 = {
  id: faker.string.uuid(),
  name: `${productBrand2} ${faker.helpers.enumValue(productDescriptor)} Shorts`,
  size: "xxl",
  brand: productBrand2,
  color: productColor2,
  description: `${productBrand2}'s best performing XXL shorts`,
};

console.log(JSON.stringify(product2));
