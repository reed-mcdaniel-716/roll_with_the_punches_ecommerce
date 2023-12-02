const { faker } = require("@faker-js/faker");
const {
  productBrands,
  productColors,
  productSizes,
  productDescriptor,
} = require("./types.ts");

// USERS
const userId1 = faker.string.uuid();
const user1 = {
  id: userId1,
  username: faker.internet.userName(),
  password: faker.internet.password(),
  created_at: faker.date.future(),
  updated_at: faker.date.future(),
};

console.log(JSON.stringify(user1));

const userId2 = faker.string.uuid();
const user2 = {
  id: userId2,
  username: faker.internet.userName(),
  password: faker.internet.password(),
  created_at: faker.date.future(),
  updated_at: faker.date.future(),
};

console.log(JSON.stringify(user2));

// PRODUCTS
const productBrand1 = faker.helpers.enumValue(productBrands);
const productColor1 = faker.helpers.enumValue(productColors);
const productId1 = faker.string.uuid();

const product1 = {
  id: productId1,
  name: `${productBrand1} ${faker.helpers.enumValue(productDescriptor)} Gloves`,
  size: "16oz",
  brand: productBrand1,
  color: productColor1,
  description: `${productBrand1}'s best 160z gloves`,
};

console.log(JSON.stringify(product1));

const productBrand2 = faker.helpers.enumValue(productBrands);
const productColor2 = faker.helpers.enumValue(productColors);
const productId2 = faker.string.uuid();

const product2 = {
  id: productId2,
  name: `${productBrand2} ${faker.helpers.enumValue(productDescriptor)} Shorts`,
  size: "xxl",
  brand: productBrand2,
  color: productColor2,
  description: `${productBrand2}'s best performing XXL shorts`,
};

console.log(JSON.stringify(product2));

// CARTS

const cartId1 = faker.string.uuid();

const cart1 = {
  id: cartId1,
  user_id: userId1,
  product_id: productId1,
  quantity: 1,
};

console.log(JSON.stringify(cart1));

const cartId2 = faker.string.uuid();

const cart2 = {
  id: cartId2,
  user_id: userId1,
  product_id: productId2,
  quantity: 2,
};

console.log(JSON.stringify(cart2));

// ORDERS

const orderId1 = faker.string.uuid();

const order1 = {
  id: orderId1,
  user_id: userId1,
  cart_id: cartId1,
  order_date: faker.date.future(),
  is_gift: faker.datatype.boolean(),
};

console.log(JSON.stringify(order1));

const orderId2 = faker.string.uuid();

const order2 = {
  id: orderId2,
  user_id: userId2,
  cart_id: cartId2,
  order_date: faker.date.future(),
  is_gift: faker.datatype.boolean(),
};

console.log(JSON.stringify(order2));
