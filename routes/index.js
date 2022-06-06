var express = require("express");
var router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const loginUser = require("../auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

const loginValidator = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Must provide email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .isLength({ max: 62 })
    .withMessage("Email can't be longer than 62 characters"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("please provide a password"),
];

// login page
router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.render("login", { csrfToken: req.csrfToken() });
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidator,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const validationErrors = validationResult(req);
    const errors = [];

    if (validationErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });

      if (user) {
        const passMatch = await bcrypt.compare(
          password,
          user.password.toString()
        );
        if (passMatch) {
          // Log in user
          loginUser(req, res, user);
          return res.redirect("/");
        }
      }
      errors.push("Login failed, no matching email and password");
    } else {
      errors = validationErrors.array().map(err => err.msg);
    }

    res.render("login", { email, csrfToken: req.csrfToken(), errors });
  })
);

// signup page

module.exports = router;
