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
