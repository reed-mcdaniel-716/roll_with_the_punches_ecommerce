/* eslint-disable no-undef */
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../database/db");

passport.serializeUser((user, done) => {
  console.log("serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializing user:", id);
  db.getUserById(id).then((result) => {
    done(null, result.user);
  });
});

const callbackUrl =
  process.env.NODE_ENV === "dev"
    ? process.env.LOCAL_GOOGLE_CALLBACK_URL
    : process.env.GOOGLE_CALLBACK_URL;

passport.use(
  new GoogleStrategy(
    {
      // stategy options
      callbackURL: callbackUrl,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      console.log("callback in GoogleStrategy...");
      // callback for authentication
      db.getUserByGoogleId(profile.id).then(async (result) => {
        if (result.user) {
          // already have user
          // update username to match profile
          await db.updateUser(result.user.id, profile.displayName);
          console.log("found existing user and returning user part:", result);
          done(null, result.user);
        } else if (!result.error) {
          // if not and no error, create new user
          db.createUser(profile.displayName, profile.id).then(
            async (result1) => {
              if (result1.user_id) {
                // user created successfully
                const result2 = await db.getUserById(result1.user_id);
                console.log(
                  "created new user and returning user part:",
                  result2
                );
                done(null, result2.user);
              } else {
                throw new Error(result1.error);
              }
            }
          );
        } else {
          // handle error
          throw new Error(result.error);
        }
      });
    }
  )
);
