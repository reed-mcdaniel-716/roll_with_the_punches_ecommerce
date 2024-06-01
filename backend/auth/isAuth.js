const isAuth = (req, res, next) => {
  console.log("auth check ......");
  if (req.user) {
    next();
  } else {
    console.log("user is not logged in");
    res.json({ loggedIn: false });
  }
};

module.exports = isAuth;
