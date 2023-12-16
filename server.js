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
  /*db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
    
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });*/
}));

app.get('/users', async (req, resp) => {
  const users = await db.readAllUsers();
  resp.status(200).json(users);
});

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
