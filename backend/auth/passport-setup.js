require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../database/db");

passport.use(
  new GoogleStrategy(
    {
      // stategy options
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // callback for authentication
      console.log(
        `signing up user ${profile.displayName} with google_id ${profile.id}`
      );
      const result = await db.createUser(profile.displayName, profile.id);
      if (result.user_id) {
        // continue here with net ninja ep.12
        console.log(`Successfully created user with ID ${result.user_id}`);
      } else {
        // send back to login
        resp.redirect("/auth/google");
      }
    }
  )
);
