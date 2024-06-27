/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./database/db");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const authRouter = require("./auth/auth");
// requiring runs file contents
// eslint-disable-next-line no-unused-vars
const passportSetup = require("./auth/passport-setup");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const isAuth = require("./auth/isAuth");
const morgan = require("morgan");
const MemoryStore = require("memorystore")(session);

// Logging + Formatting
//const loggingFormat = process.env.NODE_ENV === "dev" ? "dev" : "tiny";
const loggingFormat = "dev";
app.use(morgan(loggingFormat));
app.use(express.json());

const originUrls =
  process.env.NODE_ENV === "dev"
    ? [process.env.LOCAL_CLIENT_URL, process.env.LOCAL_CLIENT_IP_URL]
    : [process.env.CLIENT_URL];

// Security + Cookie + Session config
app.use(
  cors({
    credentials: true,
    origin: originUrls,
  })
);

// CORS enables for pre-flight reqs
app.options("*", cors());

// Render has app behind a proxy
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.COOKIE_SESSION_KEY,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? "true" : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      //expires: 60 * 60 * 1000,
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
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

app.get("/users/current", isAuth, async (req, resp) => {
  if (req.user) {
    const user = {
      user: { ...req.user },
      loggedIn: true,
    };
    resp.status(200).json(user);
  } else {
    resp.status(500).json({ error: "Error getting user" });
  }
});

app.post("/users/delete", isAuth, async (req, resp, next) => {
  const result = await db.deleteUser(req.user.id);
  if (result.user_id) {
    // logout flow
    req.logout(req.user, (err) => {
      if (err) return next(err);
    });
    resp.clearCookie("connect.sid");
    resp.send({ loggedIn: false, user: { ...req.user } });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// PRODUCTS
app.get("/products", isAuth, async (req, resp) => {
  const result = await db.getAllProducts();
  if (result.products) {
    resp.status(200).json(result.products);
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/products/:id", isAuth, async (req, resp) => {
  const result = await db.getProduct(req.params.id);
  if (result.product) {
    resp.status(200).json({ ...result.product });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// CARTS

app.post("/carts/manage", isAuth, async (req, resp) => {
  const result = await db.manageCart(
    req.body.user_id,
    req.body.product_id,
    req.body.quantity
  );
  if (!result.error) {
    resp.status(200).json({ id: result.cart_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/carts/:user_id", isAuth, async (req, resp) => {
  const result = await db.getCartsForUser(req.params.user_id);
  if (result.carts) {
    resp.status(200).json({ ...result.carts });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

// CHECKOUT
app.post("/checkout/:user_id", isAuth, async (req, resp) => {
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

app.get("/orders/:user_id", isAuth, async (req, resp) => {
  const result = await db.getOrdersForUser(req.params.user_id);
  if (result.orders) {
    resp.status(200).json({ ...result.orders });
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

const PORT = `${process.env.SERVER_PORT}`;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}...`);
});
