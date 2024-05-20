// AUTH

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(express.urlencoded({ extended: false }));

// SESSION MIDDLEWARE
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

const authUser = async (username, password, done) => {
  console.log(`Value of "Username" in authUser function ----> ${username}`); //passport will populate, user = req.body.username
  console.log(`Value of "Password" in authUser function ----> ${password}`); //passport will popuplate, password = req.body.password

  // Use the "user" and "password" to search the DB and match user/password to authenticate the user
  try {
    const result = await db.getUserByUsername(username);
    if (result.err) {
      return done(new Error(JSON.stringify(result.err)));
    } else if (!result.user) {
      return done(null, false, { message: "No user with that username" });
    }

    const user = result.user;
    if (user.password != password) {
      return done(null, false, { message: "Password incorrect" });
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
};

passport.use(new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);

  done(null, user.id);

  // Passport will pass the authenticated_user to serializeUser as "user"
  // This is the USER object from the done() in auth function
  // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id},
  // so that it is tied to the session object
});

passport.deserializeUser(async (id, done) => {
  console.log("---------> Deserialize Id");
  console.log(id);

  try {
    const result = await db.getUserById(id);
    if (result.err) {
      return done(new Error(JSON.stringify(result.err)));
    } else if (!result.user) {
      return done(null, false, { message: "No user with that id" });
    }

    const user = result.user;
    return done(null, user);
  } catch (err) {
    done(err);
  }

  // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
  // use the id to find the user in the DB and get the user object with user details
  // pass the USER object in the done() of the de-serializer
  // this USER object is attached to the "req.user", and can be used anywhere in the App.
});

//Middleware to see how the params are populated by Passport
/*let count = 1;

const printData = (req, res, next) => {
  console.log("\n==============================");
  console.log(`------------>  ${count++}`);

  console.log(`req.body.username -------> ${req.body.username}`);
  console.log(`req.body.password -------> ${req.body.password}`);

  console.log(`\n req.session.passport -------> `);
  console.log(req.session.passport);

  console.log(`\n req.user -------> `);
  console.log(req.user);

  console.log("\n Session and Cookie");
  console.log(`req.session.id -------> ${req.session.id}`);
  console.log(`req.session.cookie -------> `);
  console.log(req.session.cookie);

  console.log("===========================================\n");

  next();
};

app.use(printData); //user printData function as middleware to print populated variables*/

app.get("/login", checkLoggedIn, (req, res) => {
  res.status(400).json({
    error: {
      name: "error",
      severity: "ERROR",
      detail: "login screen, try again.",
    },
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.delete("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log("Error logging out");
      next(err);
    }
    res.redirect("/login");
    console.log(`-------> User Logged out`);
  });
});
