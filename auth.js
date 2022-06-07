// const { User } = require('./db/models/user');
const db = require("./db/models");
const { asyncHandler } = require("./routes/utils");

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const loginDemoUser = (req, res) => {
  req.session.auth = {
    userId: 1,
  };
};

const restoreUser = asyncHandler(async (req, res, next) => {
  // log req.session object to console
  console.log("REQ.SESSION:", req.session);

  // check if there is an authenticated user
  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      // if user found - deconstruct user from req.session.auth property
      const user = await db.User.findByPk(userId);

      // if user successfully retrieved from database
      if (user) {
        res.locals.authenticated = true; // current request has authenticated user
        res.locals.user = user; // set user that was just retrieved from database
        next(); // pass to next middleware
      }
    } catch (err) {
      res.locals.authenticated = false; // req does not have authenticated user
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
});

module.exports = {
  loginUser,
  loginDemoUser,
  restoreUser,
};
