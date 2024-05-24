require("dotenv").config();
const express = require("express");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";
const authRouter = express.Router();

// auth login
authRouter.get("/login", (req, res) => {});

// auth with google
// configured in passport-setup.js
authRouter.get(
  "/google",
  passport.authenticate("google", {
    // scopes
    scope: ["profile"],
  })
);

// auth logout
authRouter.get("logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

// callback route for google to redirect to
authRouter.get("/google/redirect", (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = authRouter;

// continue with net ninja ep. 8
