require("dotenv").config();
const express = require("express");
const passport = require("passport");

const authRouter = express.Router();

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
authRouter.post("/logout", function (req, resp, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    resp.redirect(`${process.env.CLIENT_URL}`);
  });
});

// callback route for google to redirect to
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, resp) => {
    resp.redirect(`${process.env.CLIENT_URL}`);
  }
);

module.exports = authRouter;
