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

// PRODUCTS
const createProduct = async (
  name,
  size,
  color,
  brand,
  price,
  description,
  category
) => {
  try {
    const inputs = [name, size, color, brand, price, description, category];
    if (inputs.every((elem) => elem === undefined)) {
      throw new Error("No attributes provided for createProduct");
    }
    const result = await pool.query(
      "insert into products (name, size, color, brand, price, description, category) values ($1::text, $2::product_sizes, $3::product_colors, $4::product_brands, $5::float8::numeric::money, $6::text, $7::product_categories) returning id",
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

// may only update quantity of object in cart
const manageCart = async (user_id, product_id, quantity) => {
  try {
    if (product_id === undefined) {
      throw new Error("No product_id provided for manageCart");
    } else if (user_id === undefined) {
      throw new Error("No user_id provided for manageCart");
    } else if (quantity === undefined) {
      throw new Error("No quantity provided for manageCart");
    }

    // check if quantity is non-zero
    const numericQuantity = parseInt(quantity);
    const zeroQuantity = numericQuantity === 0;

    // check for existing cart entry
    const result = await pool.query(
      "select * from carts where product_id = $1::uuid and user_id = $2::uuid and checked_out = false",
      [product_id, user_id]
    );

    if (result.rows.length === 0) {
      // if cart entry does not exist and quantity is zero, do nothing
      if (zeroQuantity) {
        return { cart_id: null, error: null };
      } else {
        // if cart entry does not exist and quantity is non-zero, create cart
        const newResult = await pool.query(
          "insert into carts (user_id, product_id, quantity) values ($1::uuid, $2::uuid, $3::integer) returning id",
          [user_id, product_id, quantity]
        );

        const id = newResult.rows[0].id;
        return { cart_id: id, error: null };
      }
    } else {
      const existingCart = result.rows[0];
      // if cart entry exists and new quantity is zero, delete cart
      if (zeroQuantity) {
        const newResult = await pool.query(
          "delete from carts where id = $1::uuid and checked_out = false returning id",
          [existingCart.id]
        );

        const id = newResult.rows[0].id;
        return { cart_id: id, error: null };
      } else {
        // if cart entry exsits and new quanity is no-zero, update cart
        const newResult = await pool.query(
          "update carts set quantity = $1::integer where id = $2::uuid returning id",
          [numericQuantity, existingCart.id]
        );
        const id = newResult.rows[0].id;
        return { cart_id: id, error: null };
      }
    }
  } catch (err) {
    const errObj = constructError(err, "manageCart");
    console.log(`Error managing cart: ${JSON.stringify(errObj)}`);
    return { cart_id: null, error: errObj };
  }
};

const getCartsForUser = async (user_id) => {
  try {
    const result = await pool.query(
      "select * from carts  where user_id = $1::uuid and checked_out = false",
      [user_id]
    );
    const carts = result.rows;
    return { carts: carts, error: null };
  } catch (err) {
    const errObj = constructError(err, "getCartsForUser");
    console.log(`Error getting all carts for user: ${JSON.stringify(errObj)}`);
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
      "select * from carts where user_id = $1::uuid and checked_out = false",
      [user_id]
    );
    const carts = cartResult.rows;
    console.log(`user ${user_id}'s carts are: `, carts);

    // mark carts as checked out
    await client.query(
      "update carts set checked_out = true where user_id = $1::uuid",
      [user_id]
    );

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

const getOrdersForUser = async (user_id) => {
  try {
    const result = await pool.query(
      "select * from orders where user_id=$1::uuid",
      [user_id]
    );
    const orders = result.rows;
    return { orders: orders, error: null };
  } catch (err) {
    const errObj = constructError(err, "getOrdersForUser");
    console.log(`Error getting all orders for user: ${JSON.stringify(errObj)}`);
    return { orders: null, error: errObj };
  }
};

// TODO: get all orders for user

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getUserByGoogleId,
  updateUser,
  deleteUser,
  createProduct,
  getProduct,
  manageCart,
  getCartsForUser,
  checkout,
  getAllProducts,
  getOrdersForUser,
};
