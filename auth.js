const { User } = require('./db/models/user');

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const restoreUser = async (req, res, next) => {
  // log req.session object to console
  console.log(req.session);

  // check if there is an authenticated user
  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      // if user found - deconstruct user from req.session.auth property
      const user = await User.findByPk(userId);

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
    res.locals.authenticated =  false;
    next();
  }
}


module.exports = {
  loginUser,
  restoreUser,
}
