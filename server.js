// help from: https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
const PORT = 3000;
const express = require("express");
const app = express();
const db = require("./database/db");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// LOGGING
const morgan = require("morgan");
app.use(morgan("dev"));

// AUTH

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(express.urlencoded({ extended: false }));

// SESSION MIDDLEWARE
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

const authUser = async (username, password, done) => {
  console.log(`Value of "Username" in authUser function ----> ${username}`); //passport will populate, user = req.body.username
  console.log(`Value of "Password" in authUser function ----> ${password}`); //passport will popuplate, password = req.body.password

  // Use the "user" and "password" to search the DB and match user/password to authenticate the user
  try {
    const result = await db.getUserByUsername(username);
    if (result.err) {
      return done(new Error(JSON.stringify(result.err)));
    } else if (!result.user){
      return done(null, false, { message: "No user with that username" });
    }

    const user = result.user;
    if (user.password != password) {
      return done(null, false, { message: "Password incorrect" });
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
};

passport.use(new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user.id);

  // Passport will pass the authenticated_user to serializeUser as "user"
  // This is the USER object from the done() in auth function
  // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id},
  // so that it is tied to the session object
});

passport.deserializeUser(async (id, done) => {
  console.log("---------> Deserialize Id");
  console.log(id);

  try {
    const result = await db.getUserById(id);
    if (result.err) {
      return done(new Error(JSON.stringify(result.err)));
    } else if (!result.user){
      return done(null, false, { message: "No user with that id" });
    }

    const user = result.user;
    return done(null, user);
  } catch (err) {
    done(err);
  }

  // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
  // use the id to find the user in the DB and get the user object with user details
  // pass the USER object in the done() of the de-serializer
  // this USER object is attached to the "req.user", and can be used anywhere in the App.
});

//Middleware to see how the params are populated by Passport
/*let count = 1;

const printData = (req, res, next) => {
  console.log("\n==============================");
  console.log(`------------>  ${count++}`);

  console.log(`req.body.username -------> ${req.body.username}`);
  console.log(`req.body.password -------> ${req.body.password}`);

  console.log(`\n req.session.passport -------> `);
  console.log(req.session.passport);

  console.log(`\n req.user -------> `);
  console.log(req.user);

  console.log("\n Session and Cookie");
  console.log(`req.session.id -------> ${req.session.id}`);
  console.log(`req.session.cookie -------> `);
  console.log(req.session.cookie);

  console.log("===========================================\n");

  next();
};

app.use(printData); //user printData function as middleware to print populated variables*/

app.get("/login", checkLoggedIn, (req, res) => {
  res.status(400).json({"error":{"name":"error","severity":"ERROR","detail":"login screen, try again."}});
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.delete("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log("Error logging out");
      next(err);
    }
    res.redirect("/login");
    console.log(`-------> User Logged out`);
  });
});

// API DOCS
const swaggerDocument = YAML.load("./openapi_spec.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// USERS

app.post("/signup", async (req, resp) => {
  console.log(
    `signing up user ${req.body.username} with password ${req.body.password}`
  );
  const result = await db.createUser(req.body.username, req.body.password);
  if (result.user_id) {
    resp.status(201).json({ id: result.user_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.get("/users", async (req, resp) => {
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

app.get("/users/:id", async (req, resp) => {
  console.log(`getting user ${req.params.id}`);
  const result = await db.getUserById(req.params.id);
  if (result.user) {
    resp.status(200).json({...result.user});
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
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
  console.log(
    `deleting user ${req.params.id}`
  );
  const result = await db.deleteUser(
    req.params.id
  );
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
  console.log(
    `creating product with attributes: `
  );
  console.log(req.body)
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
    resp.status(200).json({...result.product});
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});


app.patch("/products/:id", async (req, resp) => {
  console.log(
    `updating product ${req.params.id} with attributes: `
  );
  console.log(req.body)
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
  console.log(
    `deleting product ${req.params.id}`
  );
  const result = await db.deleteProduct(
    req.params.id
  );
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
  console.log(
    `creating cart with attributes: `
  );
  console.log(req.body)
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
    resp.status(200).json({...result.cart});
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.patch("/carts/:id", async (req, resp) => {
  console.log(
    `updating cart ${req.params.id} with attributes: `
  );
  console.log(req.body)
  const result = await db.updateCart(
    req.params.id,
    req.body.quantity
  );
  if (result.cart_id) {
    resp.status(200).json({ id: result.cart_id });
  } else if (result.error) {
    resp.status(500).json({ error: result.error });
  } else {
    resp.status(500).json({ error: "Unknown error" });
  }
});

app.delete("/carts/:id", async (req, resp) => {
  console.log(
    `deleting cart ${req.params.id}`
  );
  const result = await db.deleteCart(
    req.params.id
  );
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

// ORDERS
/*app.get("/orders", async (req, resp) => {
  console.log("getting orders");
  const orders = await db.getAllOrders();
  resp.status(200).json(orders);
});*/

// ROOT

app.get("/", checkAuthenticated, async (req, res) => {
  await db.initializeDatabase();
  res.status(200).send(`All set ${req.user.username}`);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
