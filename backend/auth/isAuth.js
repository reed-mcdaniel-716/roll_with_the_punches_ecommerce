const isAuth = (req, res, next) => {
  console.log("isAuth called with the following req:", req);
  if (req.user) {
    next();
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports = isAuth;
