require("dotenv").config();
const pg = require("pg");
const _ = require("lodash");

const constructError = (error, functionName) => {
  const errName = error.name ?? "error";
  const errSeverity = error.severity ?? "ERROR";
  const errDetail =
    error.detail ?? error.message ?? `An error has occured in ${functionName}`;
  const errConstraint = error.constraint ?? null;
  const err = {
    name: errName,
    severity: errSeverity,
    detail: errDetail,
    constraint: errConstraint,
  };
  return err;
};

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});

// USERS
const createUser = async (username, google_id) => {
  try {
    if (username === undefined || google_id === undefined) {
      throw new Error(
        "Either username or google_id not provided to createUser"
      );
    }
    const result = await pool.query(
      "insert into users (username, google_id) values ($1::text, $2::text) returning id",
      [username, google_id]
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
    return { user: user, error: null };
  } catch (err) {
    const errObj = constructError(err, "getUserByUsername");
    console.log(`Error geting user ${username}: ${JSON.stringify(errObj)}`);
    return { user: null, error: errObj };
  }
};

const getUserById = async (id) => {
  console.log(`looking for user: ${id}`);
  try {
    if (id === undefined) {
      throw new Error("No id provided to getUserById");
    }
    const result = await pool.query("select * from users where id = $1::uuid", [
      id,
    ]);
    const user = result.rows[0];
    return { user: user, error: null };
  } catch (err) {
    const errObj = constructError(err, "getUserById");
    console.log(`Error geting user ${id}: ${JSON.stringify(errObj)}`);
    return { user: null, error: errObj };
  }
};

const getUserByGoogleId = async (google_id) => {
  console.log(`looking for user with google_id: ${google_id}`);
  try {
    if (google_id === undefined) {
      throw new Error("No id provided to getUserByGoogleId");
    }
    const result = await pool.query(
      "select * from users where google_id = $1::text",
      [google_id]
    );
    const user = result.rows[0];
    return { user: user, error: null };
  } catch (err) {
    const errObj = constructError(err, "getUserByGoogleId");
    console.log(
      `Error geting user with google_id ${google_id}: ${JSON.stringify(errObj)}`
    );
    return { user: null, error: errObj };
  }
};

const updateUser = async (user_id, username) => {
  // only allow for username updates
  try {
    if (user_id === undefined) {
      throw new Error("No user_id provided to updateUser");
    }

    if (username !== undefined) {
      const result = await pool.query(
        "update users set username = $1::text, updated_at = now() where id = $2::uuid returning id",
        [username, user_id]
      );
      const id = result.rows[0].id;
      return { user_id: id, error: null };
    } else {
      // return having done nothing
      return { user_id, error: null };
    }
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
    if (inputs.every((elem) => elem === undefined)) {
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
    if (product_id === undefined) {
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

const updateProduct = async (
  product_id,
  name,
  size,
  color,
  brand,
  price,
  description
) => {
  try {
    if (product_id === undefined) {
      throw new Error("No product_id provided for updateProduct");
    }
    const inputs = { name, size, color, brand, price, description };
    console.log("product update inputs:");
    console.log(inputs);
    const prodAttr = _.omitBy(inputs, _.isUndefined);
    if (_.isEmpty(prodAttr)) {
      throw new Error("No attributes provided for updateProduct");
    }
    let queryStringPrefix = "update products set";
    let queryParts = [];
    for (let key in prodAttr) {
      let sub = "";
      if (key == "size") {
        sub = `${key} = '${prodAttr[key]}'::product_sizes`;
      } else if (key == "color") {
        sub = `${key} = '${prodAttr[key]}'::product_colors`;
      } else if (key == "brand") {
        sub = `${key} = '${prodAttr[key]}'::product_brands`;
      } else if (key == "price") {
        sub = `${key} = '${prodAttr[key]}'::float8::numeric::money`;
      } else {
        sub = `${key} = '${prodAttr[key]}'::text`;
      }
      queryParts.push(sub);
    }
    const queryString = `${queryStringPrefix} ${queryParts.join(
      ", "
    )} where id = $1::uuid returning id`;
    console.log(`prod update query string is "${queryString}"`);
    const result = await pool.query(queryString, [product_id]);
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
    if (user_id === undefined || product_id === undefined) {
      throw new Error("user_id or product_id not provided to createCart");
    }

    let result;
    if (quantity !== undefined) {
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
    if (cart_id === undefined) {
      throw new Error("No id provided for getCart");
    }
    const result = await pool.query("select * from carts where id = $1::uuid", [
      cart_id,
    ]);
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
    if (cart_id === undefined || quantity === undefined) {
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
const checkout = async (user_id, isGift = false) => {
  // placing all within a single transaction
  const client = await pool.connect();
  try {
    if (user_id === undefined) {
      throw new Error("No user_id provided for checkout");
    }
    // begin transaction
    await client.query("BEGIN");
    const cartResult = await client.query(
      "select * from carts where user_id = $1::uuid",
      [user_id]
    );
    const carts = cartResult.rows;
    console.log(`user ${user_id}'s carts are: `, carts);
    const allCartIds = carts.map((cart) => {
      return cart.id;
    });
    const allCosts = await Promise.all(
      carts.map(async (cart) => {
        const cartProdRes = await client.query(
          "select price::numeric::float8 from products where id=$1::uuid",
          [cart.product_id]
        );
        const cartCost =
          parseFloat(cartProdRes.rows[0].price) * parseInt(cart.quantity);

        return cartCost;
      })
    );
    // aggregate carts to compose an order

    const totalOrderPrice = allCosts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const orderResult = await client.query(
      "insert into orders (user_id, cart_id_arr, total_cost, is_gift) values ($1::uuid, $2::uuid[], $3::float8::numeric::money, $4::boolean) returning id",
      [user_id, allCartIds, totalOrderPrice, isGift]
    );
    await client.query("COMMIT");

    const finalOrder = orderResult.rows[0];

    // remove carts now that order is created

    return { order: finalOrder, error: null };
  } catch (err) {
    await client.query("ROLLBACK");
    const errObj = constructError(err, "checkout");
    console.log(`Error checking out: ${JSON.stringify(errObj)}`);
    return { order: null, error: errObj };
  } finally {
    client.release();
  }
};

// ORDERS

const getOrder = async (order_id) => {
  try {
    if (order_id === undefined) {
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
  getUserByGoogleId,
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
};
