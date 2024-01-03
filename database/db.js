const pg = require("pg");
const _ = require('lodash');
const {
  user1,
  user2,
  product1,
  product2,
  cart1,
  cart2,
  order1,
} = require("../test_data");

const constructError = (error, functionName) => {
  const errName = error.name ?? "error";
  const errSeverity = error.severity ?? "ERROR";
  const errDetail = error.detail ?? error.message ?? `An error has occured in ${functionName}`;
  const errConstraint = error.constraint ?? null;
  const err = {name: errName, severity: errSeverity, detail: errDetail, constraint: errConstraint};
  return err;
}

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

const initializeDatabase = async () => {
  try {
    await pool.query("truncate table users cascade");
    await pool.query("truncate table products cascade");
    await pool.query("truncate table carts cascade");
    await pool.query("truncate table orders cascade");

    await pool.query(
      "insert into users(username, password) values ($1::text, $2::text)",
      ["admin", "password"]
    );

    await pool.query(
      "insert into users(id, username, password, created_at, updated_at) values ($1::uuid, $2::text, $3::text, $4::timestamp, $5::timestamp), ($6::uuid, $7::text, $8::text, $9::timestamp, $10::timestamp)",
      [
        user1.id,
        user1.username,
        user1.password,
        user1.created_at,
        user1.updated_at,
        user2.id,
        user2.username,
        user2.password,
        user2.created_at,
        user2.updated_at,
      ]
    );

    await pool.query(
      "insert into products(id, name, size, color, brand, price, description) values ($1::uuid, $2::text, $3::product_sizes, $4::product_colors, $5::product_brands, $6::float8::numeric::money, $7::text), ($8::uuid, $9::text, $10::product_sizes, $11::product_colors, $12::product_brands, $13::float8::numeric::money, $14::text)",
      [
        product1.id,
        product1.name,
        product1.size,
        product1.color,
        product1.brand,
        product1.price,
        product1.description,
        product2.id,
        product2.name,
        product2.size,
        product2.color,
        product2.brand,
        product2.price,
        product2.description,
      ]
    );

    await pool.query(
      "insert into carts(id, user_id, product_id, quantity) values ($1::uuid, $2::uuid, $3::uuid, $4::integer), ($5::uuid, $6::uuid, $7::uuid, $8::integer)",
      [
        cart1.id,
        cart1.user_id,
        cart1.product_id,
        cart1.quantity,
        cart2.id,
        cart2.user_id,
        cart2.product_id,
        cart2.quantity,
      ]
    );

    await pool.query(
      "insert into orders (id, user_id, cart_id_arr, total_cost, order_date, is_gift) values ($1::uuid, $2::uuid, $3::uuid[], $4::float8::numeric::money, $5::timestamp, $6::boolean)",
      [
        order1.id,
        order1.user_id,
        order1.cart_id_arr,
        order1.total_cost,
        order1.order_date,
        order1.is_gift,
      ]
    );
  } catch (err) {
    const errObj = constructError(err, "initializeDatabase");
    console.log(`Error initializing database: ${JSON.stringify(errObj)}`);
    throw new Error(JSON.stringify(errObj));
  }
};

// USERS
const createUser = async (username, password) => {
  try {
    if (username === undefined || password === undefined) {
      throw new Error("Either username or password not provided to createUser");
    }
    const result = await pool.query(
      "insert into users (username, password) values ($1::text, $2::text) returning id",
      [username, password]
    );
    const id = result.rows[0].id;
    return { user_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "createUser");
    console.log(`Error creating user: ${JSON.stringify(errObj)}`);
    return { user_id: null, error: errObj };
  }
};

const getUserByUsername = async (username) => {
  console.log(`looking for user: ${username}`);
  try {
    if (username === undefined) {
      throw new Error("No username provided to getUserByUsername");
    }
    const result = await pool.query(
      "select * from users where username = $1::text",
      [username]
    );
    const user = result.rows[0];
    return {user: user, error: null};
  } catch (err) {
    const errObj = constructError(err, "getUserByUsername");
    console.log(`Error geting user ${username}: ${JSON.stringify(errObj)}`);
    return {user: null, error: errObj};
  }
};

const getUserById = async (id) => {
  console.log(`looking for user: ${id}`);
  try {
    if (id === undefined) {
      throw new Error("No id provided to getUserById");
    }
    const result = await pool.query(
      "select * from users where id = $1::uuid",
      [id]
    );
    const user = result.rows[0];
    return {user: user, error: null};
  } catch (err) {
    const errObj = constructError(err, "getUserById");
    console.log(`Error geting user ${id}: ${JSON.stringify(errObj)}`);
    return {user: null, error: errObj};
  }
};

const updateUser = async (user_id, username, password) => {
  try {
    if (user_id === undefined) {
      throw new Error("No user_id provided to updateUser");
    }

    let result;
    if (username !== undefined && password !== undefined) {
      result = await pool.query(
        "update users set username = $1::text, password = $2::text, updated_at = now() where id = $3::uuid returning id",
        [username, password, user_id]
      );
    } else if (username !== undefined) {
      result = await pool.query(
        "update users set username = $1::text, updated_at = now() where id = $2::uuid returning id",
        [username, user_id]
      );
    } else if (password !== undefined) {
      result = await pool.query(
        "update users set password = $1::text, updated_at = now() where id = $2::uuid returning id",
        [password, user_id]
      );
    }
    const id = result.rows[0].id;
    return { user_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "updateUser");
    console.log(`Error updating user: ${JSON.stringify(errObj)}`);
    return { user_id: null, error: errObj };
  }
};

const deleteUser = async (user_id) => {
  try {
    if (user_id === undefined) {
      throw new Error("No user_id provided to deleteUser");
    }

    const result = await pool.query(
      "delete from users where id = $1::uuid returning id",
      [user_id]
    );
    
    const id = result.rows[0].id;
    return { user_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "deleteUser");
    console.log(`Error deleting user: ${JSON.stringify(errObj)}`);
    return { user_id: null, error: errObj };
  }
};

// TODO
//const getAllUserCarts = async (user_id) => {};

// TODO
//const getAllUserOrders = async (user_id) => {};

const getAllUsers = async () => {
  try {
    const result = await pool.query("select * from users");
    const users = result.rows;
    return { users: users, error: null };
  } catch (err) {
    const errObj = constructError(err, "getAllUsers");
    console.log(`Error getting all users: ${JSON.stringify(errObj)}`);
    return { users: null, error: errObj };
  }
};

// PRODUCTS
const createProduct = async (name, size, color, brand, price, description) => {
  try {
    const inputs = [name, size, color, brand, price, description];
    if(inputs.every((elem) => elem === undefined)){
      throw new Error("No attributes provided for createProduct");
    }
    const result = await pool.query(
      "insert into products (name, size, color, brand, price, description) values ($1::text, $2::product_sizes, $3::product_colors, $4::product_brands, $5::float8::numeric::money, $6::text) returning id",
      [...inputs]
    );
    const id = result.rows[0].id;
    return { product_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "createProduct");
    console.log(`Error creating product: ${JSON.stringify(errObj)}`);
    return { product_id: null, error: errObj };
  }
};

const getProduct = async (product_id) => {
  try {
    if(product_id === undefined){
      throw new Error("No id provided for getProduct");
    }
    const result = await pool.query(
      "select * from products where id = $1::uuid",
      [product_id]
    );
    const product = result.rows[0];
    return { product: product, error: null };
  } catch (err) {
    const errObj = constructError(err, "getProduct");
    console.log(`Error getting product: ${JSON.stringify(errObj)}`);
    return { product: null, error: errObj };
  }
};

const updateProduct = async (product_id, name, size, color, brand, price, description) => {
  try {
    if(product_id === undefined){
      throw new Error("No product_id provided for updateProduct");
    }
    const inputs = {name, size, color, brand, price, description};
    console.log('product update inputs:');
    console.log(inputs);
    const prodAttr = _.omitBy(inputs, _.isUndefined);
    if (_.isEmpty(prodAttr)){
      throw new Error("No attributes provided for updateProduct");
    }
    let queryStringPrefix = 'update products set';
    let queryParts = [];
    for (let key in prodAttr){
      let sub = '';
      if(key == 'size'){
        sub = `${key} = '${prodAttr[key]}'::product_sizes`;
      } else if (key == 'color'){
        sub = `${key} = '${prodAttr[key]}'::product_colors`;
      } else if (key == 'brand'){
        sub = `${key} = '${prodAttr[key]}'::product_brands`;
      } else if (key == 'price'){
        sub = `${key} = '${prodAttr[key]}'::float8::numeric::money`;
      } else {
        sub = `${key} = '${prodAttr[key]}'::text`;
      }
      queryParts.push(sub);
    }
    const queryString = `${queryStringPrefix} ${queryParts.join(', ')} where id = $1::uuid returning id`;
    console.log(`prod update query string is "${queryString}"`)
    const result = await pool.query(
      queryString,
      [product_id]
    );
    const id = result.rows[0].id;
    return { product_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "updateProduct");
    console.log(`Error updating product: ${JSON.stringify(errObj)}`);
    console.log(err);
    return { product_id: null, error: errObj };
  }
};

const deleteProduct = async (product_id) => {
  try {
    if (product_id === undefined) {
      throw new Error("No product_id provided to deleteProduct");
    }

    const result = await pool.query(
      "delete from products where id = $1::uuid returning id",
      [product_id]
    );
    
    const id = result.rows[0].id;
    return { product_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "deleteProduct");
    console.log(`Error deleting product: ${JSON.stringify(errObj)}`);
    return { product_id: null, error: errObj };
  }
};

const getAllProducts = async () => {
  try {
    const result = await pool.query("select * from products");
    const products = result.rows;
    return { products: products, error: null };
  } catch (err) {
    const errObj = constructError(err, "getAllProducts");
    console.log(`Error getting all products: ${JSON.stringify(errObj)}`);
    return { products: null, error: errObj };
  }
};

// CARTS
const createCart = async (user_id, product_id, quantity) => {
  try {
    if(user_id === undefined || product_id === undefined){
      throw new Error("user_id or product_id not provided to createCart");
    }

    let result;
    if (quantity !== undefined){
      result = await pool.query(
        "insert into carts (user_id, product_id, quantity) values ($1::uuid, $2::uuid, $3::integer) returning id",
        [user_id, product_id, quantity]
      );
    } else {
      result = await pool.query(
        "insert into carts (user_id, product_id) values ($1::uuid, $2::uuid) returning id",
        [user_id, product_id]
      );
    }
    const id = result.rows[0].id;
    return { cart_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "createCart");
    console.log(`Error creating cart: ${JSON.stringify(errObj)}`);
    return { cart_id: null, error: errObj };
  }
};

const getCart = async (cart_id) => {
  try {
    if(cart_id === undefined){
      throw new Error("No id provided for getCart");
    }
    const result = await pool.query(
      "select * from carts where id = $1::uuid",
      [cart_id]
    );
    const cart = result.rows[0];
    return { cart: cart, error: null };
  } catch (err) {
    const errObj = constructError(err, "getCart");
    console.log(`Error getting cart: ${JSON.stringify(errObj)}`);
    return { cart: null, error: errObj };
  }
};

// may only update quantity of object in cart
const updateCart = async (cart_id, quantity) => {
  try {
    if(cart_id === undefined || quantity === undefined){
      throw new Error("No id provided for getCart");
    }
    const result = await pool.query(
      "update carts set quantity = $1::integer where id = $2::uuid returning id",
      [quantity, cart_id]
    );
    const id = result.rows[0].id;
    return { cart_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "updateCart");
    console.log(`Error updating cart: ${JSON.stringify(errObj)}`);
    return { cart_id: null, error: errObj };
  }
};

const deleteCart = async (cart_id) => {
  try {
    if (cart_id === undefined) {
      throw new Error("No cart_id provided to deleteCart");
    }

    const result = await pool.query(
      "delete from carts where id = $1::uuid returning id",
      [cart_id]
    );
    
    const id = result.rows[0].id;
    return { cart_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err, "deleteCart");
    console.log(`Error deleting cart: ${JSON.stringify(errObj)}`);
    return { cart_id: null, error: errObj };
  }
};

const getAllCarts = async () => {
  try {
    const result = await pool.query("select * from carts");
    const carts = result.rows;
    return { carts: carts, error: null };
  } catch (err) {
    const errObj = constructError(err, "getAllCarts");
    console.log(`Error getting all carts: ${JSON.stringify(errObj)}`);
    return { carts: null, error: errObj };
  }
};

// checkout pulls together all of a user's carts
const checkout = async (user_id) => {
  // collect all carts for a user and compile into an order
  // remove checked out carts
  try {
    if(cart_id === undefined){
      throw new Error("No id provided for getCart");
    }
    const result = await pool.query(
      "select * from carts where id = $1::uuid",
      [cart_id]
    );
    const cart = result.rows[0];
    return { cart: cart, error: null };
  } catch (err) {
    const errObj = constructError(err, "getCart");
    console.log(`Error getting cart: ${JSON.stringify(errObj)}`);
    return { cart: null, error: errObj };
  }
};

// ORDERS

const getOrder = async (order_id) => {
  try {
    if(order_id === undefined){
      throw new Error("No id provided for getOrder");
    }
    const result = await pool.query(
      "select * from orders where id = $1::uuid",
      [order_id]
    );
    const order = result.rows[0];
    return { order: order, error: null };
  } catch (err) {
    const errObj = constructError(err, "getOrder");
    console.log(`Error getting order: ${JSON.stringify(errObj)}`);
    return { order: null, error: errObj };
  }
};

const getAllOrders = async () => {
  try {
    const result = await pool.query("select * from orders");
    const orders = result.rows;
    return { orders: orders, error: null };
  } catch (err) {
    const errObj = constructError(err, "getAllOrders");
    console.log(`Error getting all orders: ${JSON.stringify(errObj)}`);
    return { orders: null, error: errObj };
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createCart,
  getCart,
  updateCart,
  deleteCart,
  checkout,
  getOrder,
  getAllUsers,
  getAllProducts,
  getAllCarts,
  getAllOrders,
  initializeDatabase,
};
