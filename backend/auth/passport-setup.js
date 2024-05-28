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
        `logging in user ${profile.displayName} with google_id ${profile.id}`
      );
      db.getUserByGoogleId(profile.id).then(async (result) => {
        if (result.user) {
          // already have user
          console.log("found current user: ", result.user);
          // update username to match profile
          await db.updateUser(result.user.id);
        } else if (!result.error) {
          // if not and no error, create new user
          db.createUser(profile.displayName, profile.id).then((result1) => {
            if (result1.user_id) {
              // user created successfully
              console.log("created current user with id: ", result1.user_id);
            } else {
              throw new Error(result1.error);
            }
          });
        } else {
          // handle error
          throw new Error(result.error);
        }
      });
    }
  )
);

// continue with ep. 15
