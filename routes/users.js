var express = require("express");
var router = express.Router();
const { loginUser, logoutUser } = require('../auth.js');
const { User, HauntList } = require('../db/models');
const { asyncHandler } = require("./utils");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get('/logout', (req, res) => {
  // research more later about why GET worked and not POST
  logoutUser(req, res);
  res.redirect('/login');
});

// USER PROFILE PAGE
router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
  // research more later about why GET worked and not POST
  const id = req.params.id;
  console.log("the id: ", typeof id);
  const currentUser = await User.findByPk(id);
  const hauntlists = await HauntList.findAll({
    where: {
      userId: id
    }
  })

  console.log("haunt lists!!!!!!!!!!!", hauntlists);

  res.render('profile', { title: "your profile", currentUser, hauntlists });
}));

module.exports = router;
