const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const db = require("./database/db");

const swaggerDocument = YAML.load("./openapi_spec.yaml");

const PORT = 3000;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users', async () => {
  const users = await db.readAllUsers();
  console.log(users);
})

app.get('/', async (req, res) => {
  console.log('initializing DB')
  await db.initializeDatabase();
  res.status(200).send('All set')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
