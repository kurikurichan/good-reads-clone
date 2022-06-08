var express = require("express");
var router = express.Router();

const { Review } = require('../db/models');
const { asyncHandler, csrfProtection } = require("./utils");
const { check, validationResult } = require("express-validator");



router.get('/new', csrfProtection, asyncHandler(async(req, res, next) => {
    res.render('reviews', { title: "wow a review", csrfToken: req.csrfToken() })
}));


module.exports = router;
