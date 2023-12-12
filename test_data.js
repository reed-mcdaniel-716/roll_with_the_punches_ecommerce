const { faker } = require("@faker-js/faker");

const productBrands = ['Everlast',
'Ringside',
'Venum',
'Hayabusa',
'Superare',
'Fairtex',
'Title'];

const productSizes = ['10oz',
'12oz',
'14oz',
'16oz',
'108in',
'120in',
'180in',
'xs',
'sm',
'med',
'lg',
'xl',
'xxl',
'xxxl'];

const productColors = ['black',
'red',
'blue',
'leather brown',
'gray',
'white',
'green',
'gold',
'silver',
'pink',
'purple'];

const productDescriptor = [
  'Champion',
  'Premium',
  '2.0',
  '3.0',
  'Elite',
  'Sparring'
];

// USERS
const userId1 = faker.string.uuid();
const user1 = {
  id: userId1,
  username: faker.internet.userName(),
  password: faker.internet.password(),
  created_at: faker.date.future(),
  updated_at: faker.date.future(),
};

const userId2 = faker.string.uuid();
const user2 = {
  id: userId2,
  username: faker.internet.userName(),
  password: faker.internet.password(),
  created_at: faker.date.future(),
  updated_at: faker.date.future(),
};

// PRODUCTS
const productBrand1 = faker.helpers.arrayElement(productBrands);
const productColor1 = faker.helpers.arrayElement(productColors);
const productId1 = faker.string.uuid();

const product1 = {
  id: productId1,
  name: `${productBrand1} ${faker.helpers.arrayElement(productDescriptor)} Gloves`,
  size: "16oz",
  brand: productBrand1,
  color: productColor1,
  description: `${productBrand1}'s best 160z gloves`,
};

const productBrand2 = faker.helpers.arrayElement(productBrands);
const productColor2 = faker.helpers.arrayElement(productColors);
const productId2 = faker.string.uuid();

const product2 = {
  id: productId2,
  name: `${productBrand2} ${faker.helpers.arrayElement(productDescriptor)} Shorts`,
  size: "xxl",
  brand: productBrand2,
  color: productColor2,
  description: `${productBrand2}'s best performing XXL shorts`,
};

// CARTS

const cartId1 = faker.string.uuid();

const cart1 = {
  id: cartId1,
  user_id: userId1,
  product_id: productId1,
  quantity: 1,
};

const cartId2 = faker.string.uuid();

const cart2 = {
  id: cartId2,
  user_id: userId1,
  product_id: productId2,
  quantity: 2,
};

// ORDERS

const orderId1 = faker.string.uuid();

const order1 = {
  id: orderId1,
  user_id: userId1,
  cart_id: cartId1,
  order_date: faker.date.future(),
  is_gift: faker.datatype.boolean(),
};

const orderId2 = faker.string.uuid();

const order2 = {
  id: orderId2,
  user_id: userId2,
  cart_id: cartId2,
  order_date: faker.date.future(),
  is_gift: faker.datatype.boolean(),
};

module.exports = {
  user1,
  user2,
  product1,
  product2,
  cart1,
  cart2,
  order1,
  order2
};