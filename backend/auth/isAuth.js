const isAuth = (req, res, next) => {
  console.log("auth check ......");
  if (req.user) {
    console.log("user is logged in.");
    next();
  } else {
    console.log("user is not logged in.");
    res.json({ loggedIn: false });
  }
};

module.exports = isAuth;
