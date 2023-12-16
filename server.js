const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const db = require("./database/db");
const passport = require('passport');
const LocalStrategy = require('passport-local');

const swaggerDocument = YAML.load("./openapi_spec.yaml");

const PORT = 3000;
const app = express();


// API DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// USERS

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.getUser(username, password, cb);
}));

app.get('/login', (req, res) => {
  console.log("need to login");
  resp.status(200).send('Ready login');
});

app.get('/users', async (req, resp) => {
  const users = await db.readAllUsers();
  resp.status(200).json(users);
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// PRODUCTS
app.get('/products', async (req, resp) => {
  const products = await db.readAllProducts();
  resp.status(200).json(products);
});

// CARTS
app.get('/carts', async (req, resp) => {
  const carts = await db.readAllCarts();
  resp.status(200).json(carts);
});

// ORDERS
app.get('/orders', async (req, resp) => {
  const orders = await db.readAllOrders();
  resp.status(200).json(orders);
});

app.get('/', async (req, res) => {
  console.log('initializing DB')
  await db.initializeDatabase();
  res.status(200).send('All set')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
