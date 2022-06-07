var express = require("express");
var router = express.Router();
const { loginUser, logoutUser } = require('../auth.js');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get('/logout', (req, res) => {
  // research more later about why GET worked and not POST
  logoutUser(req, res);
  res.redirect('/login');
})

module.exports = router;
