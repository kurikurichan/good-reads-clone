var express = require("express");
var router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "a/A Express Skeleton Home" });
});

// login page
router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.render('login', {csrfToken: req.csrfToken()})
  })
);

module.exports = router;
