require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../database/db");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  db.getUserById(id).then((user) => {
    done(null, user);
  });
});

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
          await db.updateUser(result.user.id, profile.displayName);
          done(null, result.user);
        } else if (!result.error) {
          // if not and no error, create new user
          db.createUser(profile.displayName, profile.id).then(
            async (result1) => {
              if (result1.user_id) {
                // user created successfully
                const newUser = await db.getUserById(result1.user_id);
                console.log("created new user: ", newUser);
                done(null, newUser);
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

// continue with ep. 18
