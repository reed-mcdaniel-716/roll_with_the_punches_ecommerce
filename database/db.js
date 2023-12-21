const pg = require("pg");
const {
  user1,
  user2,
  product1,
  product2,
  cart1,
  cart2,
  order1,
  order2,
} = require("../test_data");

const constructError = (name, severity, detail, constraint, functionName) => {
  const errName = name ?? "error";
  const errSeverity = severity ?? "ERROR";
  const errDetail = detail ?? `An error has occured in ${functionName}`;
  const errConstraint = constraint ?? null;
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
      "insert into products(id, name, size, color, brand, description) values ($1::uuid, $2::text, $3::product_sizes, $4::product_colors, $5::product_brands, $6::text), ($7::uuid, $8::text, $9::product_sizes, $10::product_colors, $11::product_brands, $12::text)",
      [
        product1.id,
        product1.name,
        product1.size,
        product1.color,
        product1.brand,
        product1.description,
        product2.id,
        product2.name,
        product2.size,
        product2.color,
        product2.brand,
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
      "insert into orders (id, user_id, cart_id, order_date, is_gift) values ($1::uuid, $2::uuid, $3::uuid, $4::timestamp, $5::boolean), ($6::uuid, $7::uuid, $8::uuid, $9::timestamp, $10::boolean)",
      [
        order1.id,
        order1.user_id,
        order1.cart_id,
        order1.order_date,
        order1.is_gift,
        order2.id,
        order2.user_id,
        order2.cart_id,
        order2.order_date,
        order2.is_gift,
      ]
    );
  } catch (err) {
    const errObj = constructError(err.name, err.severity, (err.detail || err.message), err.constraint, "initializeDatabase");
    console.log(`Error initializing database: ${errObj}`);
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
    const errObj = constructError(err.name, err.severity, (err.detail || err.message), err.constraint, "createUser");
    console.log(`Error creating user: ${errObj}`);
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
    const user = result[0];
    return {user: user, error: null};
  } catch (err) {
    const errObj = constructError(err.name, err.severity, (err.detail || err.message), err.constraint, "getUserByUsername");
    console.log(`Error geting user ${username}: ${errObj}`);
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
    const user = result[0];
    return {user: user, error: null};
  } catch (err) {
    const errObj = constructError(err.name, err.severity, (err.detail || err.message), err.constraint, "getUserById");
    console.log(`Error geting user ${id}: ${errObj}`);
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
        "update users set username = $1::text, password = $2::text where id = $3::uuid returning id",
        [username, password, user_id]
      );
    } else if (username !== undefined) {
      result = await pool.query(
        "update users set username = $1::text where id = $2::uuid returning id",
        [username, user_id]
      );
    } else if (password !== undefined) {
      result = await pool.query(
        "update users set password = $1::text where id = $2::uuid returning id",
        [password, user_id]
      );
    }
    const id = result.rows[0].id;
    return { user_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err.name, err.severity, (err.detail || err.message), err.constraint, "updateUser");
    console.log(`Error updating user: ${errObj}`);
    return { user_id: null, error: errObj };
  }
};

const deleteUser = async (user_id) => {
  try {
    if (user_id === undefined) {
      throw new Error("No user_id provided to updateUser");
    }

    const result = await pool.query(
      "delete from users where id = $1::uuid returning id",
      [user_id]
    );
    
    const id = result.rows[0].id;
    return { user_id: id, error: null };
  } catch (err) {
    const errObj = constructError(err.name, err.severity, (err.detail || err.message), err.constraint, "deleteUser");
    console.log(`Error deleting user: ${errObj}`);
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
    return { users: result.rows, error: errObj };
  } catch (err) {
    const errObj = constructError(err.name, err.severity, (err.detail || err.message), err.constraint, "getAllUsers");
    console.log(`Error getting all users: ${errObj}`);
    return { users: null, error: errObj };
  }
};

// PRODUCTS
const createProduct = async () => {};

const getProduct = async () => {};

const updateProduct = async () => {};

const deleteProduct = async () => {};

const getAllProducts = async () => {
  try {
    const result = await pool.query("select * from products");
    return result.rows;
  } catch (err) {
    console.log(`Error getting all products: ${err}`);
  }
};

// CARTS
const createCart = async () => {};

const getCart = async () => {};

const updateCart = async () => {};

const deleteCart = async () => {};

const getAllCarts = async () => {
  try {
    const result = await pool.query("select * from carts");
    return result.rows;
  } catch (err) {
    console.log(`Error getting all carts: ${err}`);
  }
};

// ORDERS
const createOrder = async () => {};

const getOrder = async () => {};

const updateOrder = async () => {};

const deleteOrder = async () => {};

const getAllOrders = async () => {
  try {
    const result = await pool.query("select * from orders");
    return result.rows;
  } catch (err) {
    console.log(`Error getting all orders: ${err}`);
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
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllUserCarts,
  getAllUserOrders,
  getAllUsers,
  getAllProducts,
  getAllCarts,
  getAllOrders,
  initializeDatabase,
};
