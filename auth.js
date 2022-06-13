// const { User } = require('./db/models/user');
const db = require("./db/models");
const { asyncHandler } = require("./routes/utils");

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const logoutUser = (req, res) => {
  delete req.session.auth;
  req.session.cookie.originalMaxAge = -1;
};

const loginDemoUser = (req, res) => {
  req.session.auth = {
    userId: 1,
  };
};

const restoreUser = asyncHandler(async (req, res, next) => {
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

// Put this here so we can call on splash page
// Helper function to calculate and average review average scores
async function averageScore(hauntId) {
  // parameter is integer hauntId (Review.hauntId or Haunt.id)
  // returns void - should just update the Haunt instance

  const hauntToUpdate = await db.Haunt.findByPk(hauntId);

  const hauntReviews = await db.Review.findAll({
      where: { hauntId }
  });

  const numOfReviews = hauntReviews.length;

  const reviewSum = hauntReviews.reduce((accl, rating, i) => {
      rating = hauntReviews[i].score;
      return accl + rating;
  }, 0);

  const reviewAvg = +parseFloat(reviewSum / numOfReviews).toFixed(2);

  const updatedHaunt = await hauntToUpdate.update({
      score: reviewAvg
  });

  await updatedHaunt.save();
  return;
}


module.exports = {
  loginUser,
  loginDemoUser,
  restoreUser,
  logoutUser,
  averageScore,
};
