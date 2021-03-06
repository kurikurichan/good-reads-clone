var express = require("express");
var router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, loginDemoUser } = require("../auth");
const db = require("../db/models");
const { averageScore } = require('../auth.js');

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {

    const haunts = await db.Haunt.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    for (let obj of haunts) {
      await averageScore(obj.id);
    }

    res.render("index", { haunts });
  })
);

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
    .withMessage("Please provide a password"),
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
    let errors = [];

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
          return res.redirect("/haunts");
        }
      }
      errors.push("Login failed, no matching email and password");
    } else {
      errors = validationErrors.array().map(err => err.msg);
    }

    res.render("login", { email, csrfToken: req.csrfToken(), errors });
  })
);

//demo login
router.get(
  "/demo",
  asyncHandler(async (req, res, next) => {
    loginDemoUser(req, res);
    return res.redirect("/haunts");
  })
);

// const checkEmailDup = async email => {
//   const dbEmail = await db.User.findOne({
//     where: { email },
//   });
//   console.log("dbEmail", dbEmail);
//   if (dbEmail) {
//     if (dbEmail.email === email) return true;
//   }
//   return false;
// };

// signup page
const signupValidator = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Must provide email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .isLength({ max: 62 })
    .withMessage("Email can't be longer than 62 characters")
    .custom(async email => {
      const dbEmailUser = await db.User.findOne({ where: { email } });
      if (dbEmailUser) throw new Error("Email already exits");
    }),
  check("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a name")
    .isLength({ max: 100 })
    .withMessage("Name can't be more than 100 characters"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password confirmation"),
];

router.get(
  "/signup",
  csrfProtection,
  asyncHandler((req, res, next) => {
    res.render("signup", { csrfToken: req.csrfToken() });
  })
);

router.post(
  "/signup",
  csrfProtection,
  signupValidator,
  asyncHandler(async (req, res, next) => {
    const { email, fullName, password, confirmPassword } = req.body;

    const user = await db.User.build({
      email,
      fullName,
    });

    const validationErrors = validationResult(req);
    let errors = [];

    if (validationErrors.isEmpty()) {
      if (password === confirmPassword) {
        // if (checkEmailDup(email)) {
        //   errors.push("Email already in use");
        // } else {
        const hashedPass = (await bcrypt.hash(password, 10)).toString();
        user.password = hashedPass;
        await user.save();
        loginUser(req, res, user);
        req.method = "GET";
        return res.status(200).redirect("/");
      }
      // } else {
      errors.push("Passwords must match");
      // }
    } else {
      const newErrors = validationErrors.array().map(err => err.msg);
      newErrors.forEach(err => {
        errors.push(err);
      });
    }

    res.render("signup", {
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

// redirect to reviews router hopefully
router.get("/haunts/reviews/edit/:id(\\d+)", async (req, res, next) => {
  const reviewId = req.params.id; //grab the id

  res.redirect(`reviews/edit/${reviewId}`);
});

module.exports = router;
