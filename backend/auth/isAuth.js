const isAuth = (req, res, next) => {
  console.log("isAuth called...");
  if (req.user) {
    console.log("isAuth user is:", req.user);
    next();
  } else {
    console.log("no req.user found in isAuth");
    res.json({ loggedIn: false });
  }
};

module.exports = isAuth;
