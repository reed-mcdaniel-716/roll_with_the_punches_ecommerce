const express = require("express");

const authRouter = express.Router();

// auth login
authRouter.get("/login", (req, res) => {});

// auth with google
authRouter.get("/google", (req, res) => {
  // handle with passport
  res.send("logging in with google");
});

// auth logout
authRouter.get("logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

module.exports = authRouter;
