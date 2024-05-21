const express = require("express");
const passport = require("passport");

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
  res.send("you reached the callback uri");
});

module.exports = authRouter;
