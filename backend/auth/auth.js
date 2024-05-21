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

module.exports = authRouter;
