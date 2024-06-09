// help from: https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
const PORT = 4000;
const express = require("express");
const app = express();
const db = require("./database/db");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const authRouter = require("./auth/auth");
// requiring runs file contents
const passportSetup = require("./auth/passport-setup");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const isAuth = require("./auth/isAuth");
const morgan = require("morgan");

// Logging + Formatting
app.use(morgan("dev"));
app.use(express.json());

// Security + Cookie + Session config
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "dev"
        ? [process.env.CLIENT_URL, "http://127.0.0.1:3000"]
        : [],
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SESSION_KEY,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? "true" : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      //expires: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// AUTH
app.use("/auth", authRouter);

// API DOCS
const swaggerDocument = YAML.load("./openapi_spec.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// USERS

app.get("/users", isAuth, async (req, resp) => {
  console.log("getting users");
  const result = await db.getAllUsers();
  if (result.users) {
    resp.status(200).json(result.users);
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/users/current", isAuth, async (req, resp) => {
  console.log("hit /users/current......");
  if (req.user) {
    const user = {
      user: { ...req.user },
      loggedIn: true,
    };
    console.log(
      "in /users/current have user attached to req, crafting response:",
      user
    );
    resp.status(200).json(user);
  } else {
    resp.status(500).json({ error: "Error getting user" });
  }
});

app.patch("/users/:id", async (req, resp) => {
  console.log(
    `updating user ${req.params.id} with username ${req.body.username} and password ${req.body.password}`
  );
  const result = await db.updateUser(
    req.params.id,
    req.body.username,
    req.body.password
  );
  if (result.user_id) {
    resp.status(200).json({ id: result.user_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.delete("/users/:id", async (req, resp) => {
  console.log(`deleting user ${req.params.id}`);
  const result = await db.deleteUser(req.params.id);
  if (result.user_id) {
    resp.status(200).json({ id: result.user_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// PRODUCTS
app.get("/products", async (req, resp) => {
  console.log("getting products");
  const result = await db.getAllProducts();
  if (result.products) {
    resp.status(200).json(result.products);
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.post("/products", async (req, resp) => {
  console.log(`creating product with attributes: `);
  console.log(req.body);
  const result = await db.createProduct(
    req.body.name,
    req.body.size,
    req.body.color,
    req.body.brand,
    req.body.price,
    req.body.description
  );
  if (result.product_id) {
    resp.status(201).json({ id: result.product_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/products/:id", async (req, resp) => {
  console.log(`getting product ${req.params.id}`);
  const result = await db.getProduct(req.params.id);
  if (result.product) {
    resp.status(200).json({ ...result.product });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.patch("/products/:id", async (req, resp) => {
  console.log(`updating product ${req.params.id} with attributes: `);
  console.log(req.body);
  const result = await db.updateProduct(
    req.params.id,
    req.body.name,
    req.body.size,
    req.body.color,
    req.body.brand,
    req.body.price,
    req.body.description
  );
  if (result.product_id) {
    resp.status(200).json({ id: result.product_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.delete("/products/:id", async (req, resp) => {
  console.log(`deleting product ${req.params.id}`);
  const result = await db.deleteProduct(req.params.id);
  if (result.product_id) {
    resp.status(200).json({ id: result.product_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// CARTS

app.post("/carts", async (req, resp) => {
  console.log(`creating cart with attributes: `);
  console.log(req.body);
  const result = await db.createCart(
    req.body.user_id,
    req.body.product_id,
    req.body.quantity
  );
  if (result.cart_id) {
    resp.status(201).json({ id: result.cart_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/carts/:id", async (req, resp) => {
  console.log(`getting cart ${req.params.id}`);
  const result = await db.getCart(req.params.id);
  if (result.cart) {
    resp.status(200).json({ ...result.cart });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.patch("/carts/:id", async (req, resp) => {
  console.log(`updating cart ${req.params.id} with attributes: `);
  console.log(req.body);
  const result = await db.updateCart(req.params.id, req.body.quantity);
  if (result.cart_id) {
    resp.status(200).json({ id: result.cart_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.delete("/carts/:id", async (req, resp) => {
  console.log(`deleting cart ${req.params.id}`);
  const result = await db.deleteCart(req.params.id);
  if (result.cart_id) {
    resp.status(200).json({ id: result.cart_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/carts", async (req, resp) => {
  console.log("getting carts");
  const result = await db.getAllCarts();
  if (result.carts) {
    resp.status(200).json(result.carts);
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// CHECKOUT
app.post("/checkout/:user_id", async (req, resp) => {
  console.log(
    `checking out for user ${req.params.user_id} and that it is a gift is ${req.body.is_gift}`
  );
  const result = await db.checkout(req.params.user_id, req.body.is_gift);
  if (result.order) {
    resp.status(200).json({ ...result.order });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// ORDERS
app.get("/orders", async (req, resp) => {
  console.log("getting orders");
  const result = await db.getAllOrders();
  if (result.orders) {
    resp.status(200).json(result.orders);
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/orders/:id", async (req, resp) => {
  console.log(`getting order ${req.params.id}`);
  const result = await db.getOrder(req.params.id);
  if (result.order) {
    resp.status(200).json({ ...result.order });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// ROOT
app.get("/", async (_req, resp) => {
  resp.redirect("/api-docs");
});

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}...`);
});
