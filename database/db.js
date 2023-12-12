const pg = require('pg');
const { user1, user2, product1, product2, cart1, cart2, order1, order2 } = require('../test_data');
 
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

const initializeDatabase = async () => {
  await pool.query('truncate table users cascade');
  await pool.query('truncate table products cascade');
  await pool.query('truncate table carts cascade');
  await pool.query('truncate table orders cascade');

  await pool.query(
    'insert into users(id, username, password, created_at, updated_at) values ($1::uuid, $2::text, $3::text, $4::timestamp, $5::timestamp), ($6::uuid, $7::text, $8::text, $9::timestamp, $10::timestamp)',
    [
      user1.id, user1.username, user1.password, user1.created_at, user1.updated_at,
      user2.id, user2.username, user2.password, user2.created_at, user2.updated_at,
    ]
  );

  await pool.query(
    'insert into products(id, name, size, color, brand, description) values ($1::uuid, $2::text, $3::product_sizes, $4::product_colors, $5::product_brands, $6::text), ($7::uuid, $8::text, $9::product_sizes, $10::product_colors, $11::product_brands, $12::text)',
    [
      product1.id, product1.name, product1.size, product1.color, product1.brand, product1.description,
      product2.id, product2.name, product2.size, product2.color, product2.brand, product2.description
    ]
  );

  await pool.query(
    'insert into carts(id, user_id, product_id, quantity) values ($1::uuid, $2::uuid, $3::uuid, $4::integer), ($5::uuid, $6::uuid, $7::uuid, $8::integer)',
    [
      cart1.id, cart1.user_id, cart1.product_id, cart1.quantity,
      cart2.id, cart2.user_id, cart2.product_id, cart2.quantity
    ]
  );

  await pool.query(
    'insert into orders (id, user_id, cart_id, order_date, is_gift) values ($1::uuid, $2::uuid, $3::uuid, $4::timestamp, $5::boolean), ($6::uuid, $7::uuid, $8::uuid, $9::timestamp, $10::boolean)',
    [
      order1.id, order1.user_id, order1.cart_id, order1.order_date, order1.is_gift,
      order2.id, order2.user_id, order2.cart_id, order2.order_date, order2.is_gift
    ]
  );
}

// USERS
const createUser = async () => {

}

const readUser = async () => {

}

const updateUser = async () => {

}

const deleteUser = async () => {

}

const readAllUserCarts = async () => {

}

const readAllUserOrders = async () => {

}

const readAllUsers = async () => {
  const result = await pool.query('select * from users')
  return result.rows
}


// PRODUCTS
const createProduct = async () => {

}

const readProduct = async () => {

}

const updateProduct = async () => {

}

const deleteProduct = async () => {

}

const readAllProducts = async () => {
  const result = await pool.query('select * from products')
  return result.rows
}

// CARTS
const createCart = async () => {

}

const readCart = async () => {

}

const updateCart = async () => {

}

const deleteCart = async () => {

}

const readAllCarts = async () => {
  const result = await pool.query('select * from carts')
  return result.rows
}


// ORDERS
const createOrder = async () => {

}

const readOrder = async () => {

}

const updateOrder = async () => {

}

const deleteOrder = async () => {

}

const readAllOrders = async () => {
  const result = await pool.query('select * from orders')
  return result.rows
}

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  createCart,
  readCart,
  updateCart,
  deleteCart,
  createOrder,
  readOrder,
  updateOrder,
  deleteOrder,
  readAllUserCarts,
  readAllUserOrders,
  readAllUsers,
  readAllProducts,
  readAllCarts,
  readAllOrders,
  initializeDatabase
};