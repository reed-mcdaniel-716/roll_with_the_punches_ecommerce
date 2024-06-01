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
authRouter.get("logout", (req, resp) => {
  // handle with passport
  req.logout();
  resp.redirect("/");
});

// callback route for google to redirect to
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, resp) => {
    console.log("hit auth /google/callback");
    console.log("req:", req);
    // add query params to indicate logged in status
    resp.redirect(`${process.env.CLIENT_URL}/home`);
    // figure out why it boumces from here to /login
  }
);

module.exports = authRouter;
