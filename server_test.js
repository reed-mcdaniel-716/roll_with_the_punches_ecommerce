const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const db = require("./database/db");
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');

const swaggerDocument = YAML.load("./openapi_spec.yaml");

const PORT = 3000;
const app = express();
app.use(morgan('dev'));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));

// This is the basic express session({..}) initialization.
app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".


const authUser = async (user, password, done) => {
//Search the user, password in the DB to authenticate the user
//Let's assume that a search within your DB returned the username and password match for "Kyle".
    let authenticated_user = { id: 123, username: 'admin', password: 'password'};
    console.log(`authing with user ${authenticated_user}`);
    return done (null, authenticated_user);
}

passport.use(new LocalStrategy (authUser));

passport.serializeUser( (userObj, done) => {
  done(null, userObj)
});

passport.deserializeUser((userObj, done) => {
  done (null, userObj )
});

app.get("/login", (req, res) => {
  res.send("login screen");

});

app.post ("/login", passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login",
}));

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}


// API DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// USERS

passport.use(new LocalStrategy(async (username, password, done) => {
  console.log('using passport local strategy');
  try {
    const users = await db.getUserByUsername(username, password);
    if (users.length == 0){
      return done(null, false, { message: 'No user with that email' });
    }

    const user = users[0];
    if (user.password != password){
      return done(null, false, { message: 'Password incorrect' });
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
}));

/*passport.serializeUser((user, done) => {
  console.log('serializing user');
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('deserializing user');
  try {
    const users = await db.getUserById(id);
    if (users.length == 0){
      return done(null, false, { message: 'No user with that email' });
    }

    const user = users[0];
    return done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local"),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

app.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});*/

app.get('/users', async (req, resp) => {
  console.log('getting users');
  const users = await db.getAllUsers();
  resp.status(200).json(users);
});

// PRODUCTS
app.get('/products', async (req, resp) => {
  console.log('getting products');
  const products = await db.getAllProducts();
  resp.status(200).json(products);
});

// CARTS
app.get('/carts', async (req, resp) => {
  console.log('getting carts');
  const carts = await db.getAllCarts();
  resp.status(200).json(carts);
});

// ORDERS
app.get('/orders', async (req, resp) => {
  console.log('getting orders');
  const orders = await db.getAllOrders();
  resp.status(200).json(orders);
});

// ROOT

app.get('/', checkAuthenticated, async (req, res) => {
  console.log('initializing DB')
  await db.initializeDatabase();
  res.status(200).send(`All set ${req.user.name}`)
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
