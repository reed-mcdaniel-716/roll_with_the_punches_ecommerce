/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const passport = require("passport");

const baseUrl =
  process.env.NODE_ENV === "dev"
    ? process.env.LOCAL_CLIENT_URL
    : process.env.CLIENT_URL;

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
  req.logout(req.user, (err) => {
    if (err) return next(err);
  });
  resp.clearCookie("connect.sid");
  resp.send({ loggedIn: false, user: { ...req.user } });
});

// callback route for google to redirect to
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, resp) => {
    console.log("/google/callback hit with the following req:", req);
    resp.redirect(`${baseUrl}`);
  }
);

module.exports = authRouter;
