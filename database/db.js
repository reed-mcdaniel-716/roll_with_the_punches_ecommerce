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
}

const createUser = async () => {

}

const readUser = async () => {

}

const updateUser = async () => {

}

const deleteUser = async () => {

}

const createProduct = async () => {

}

const readProduct = async () => {

}

const updateProduct = async () => {

}

const deleteProduct = async () => {

}

const createCart = async () => {

}

const readCart = async () => {

}

const updateCart = async () => {

}

const deleteCart = async () => {

}

const createOrder = async () => {

}

const readOrder = async () => {

}

const updateOrder = async () => {

}

const deleteOrder = async () => {

}

const readAllUserCarts = async () => {

}

const readAllUserOrders = async () => {

}

const readAllUsers = async () => {
  const result = await pool.query('select * from users')
  return result.rows
}


const readAllProducts = async () => {
  const result = await pool.query('select * from products')
  return result.rows
}

const readAllCarts = async () => {
  const result = await pool.query('select * from carts')
  return result.rows
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