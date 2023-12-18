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
  // 1. If the user not found, done (null, false)
  // 2. If the password does not match, done (null, false)
  // 3. If user found and password match, done (null, user)

  //let authenticated_user = { id: 123, name: "Kyle"}
  //Let's assume that DB search that user found and password matched for Kyle

  //return done (null, authenticated_user )
  try {
    const users = await db.getUserByUsername(username);
    if (users.length == 0) {
      return done(null, false, { message: "No user with that email" });
    }

    const user = users[0];
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

  //done (null, {name: "Kyle", id: 123} )
  try {
    const users = await db.getUserById(id);
    if (users.length == 0) {
      return done(null, false, { message: "No user with that email" });
    }

    const user = users[0];
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
let count = 1;

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

app.use(printData); //user printData function as middleware to print populated variables

app.get("/login", checkLoggedIn, (req, res) => {
  res.send("login screen, try again");
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

app.get("/users", async (req, resp) => {
  console.log("getting users");
  const users = await db.getAllUsers();
  resp.status(200).json(users);
});

// PRODUCTS
app.get("/products", async (req, resp) => {
  console.log("getting products");
  const products = await db.getAllProducts();
  resp.status(200).json(products);
});

// CARTS
app.get("/carts", async (req, resp) => {
  console.log("getting carts");
  const carts = await db.getAllCarts();
  resp.status(200).json(carts);
});

// ORDERS
app.get("/orders", async (req, resp) => {
  console.log("getting orders");
  const orders = await db.getAllOrders();
  resp.status(200).json(orders);
});

// ROOT

app.get("/", checkAuthenticated, async (req, res) => {
  await db.initializeDatabase();
  res.status(200).send(`All set ${req.user.username}`);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
