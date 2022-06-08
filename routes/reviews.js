var express = require("express");
var router = express.Router();

const { Haunt, Review } = require('../db/models');
const { asyncHandler, csrfProtection } = require("./utils");
const { check, validationResult } = require("express-validator");


const reviewValidator = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Must provide review")
      .isLength({ min:1, max: 500 })
      .withMessage("Review can't be longer than 500 characters"),
    check("score")
      .exists({ checkFalsy: true })
      .withMessage("A rating is required"),
];


// GET page with form for new review
// Id is the id of the haunt the review will be on
router.get('/new/:id(\\d+)', csrfProtection, asyncHandler(async(req, res, next) => {

    const hauntId = req.params.id;
    const haunt = await Haunt.findByPk(+hauntId);

    res.render('reviews', { title: "wow a review", csrfToken: req.csrfToken(), haunt });

}));

// POST new review data
router.post('/', csrfProtection, reviewValidator, asyncHandler(async(req, res) => {
    //TODO: deconstruct form data from review
    const { userId, hauntId, score, review } = req.body;
    const haunt = await Haunt.findByPk(+hauntId);

    const validationErrors = validationResult(req);
    let errors = [];
    // await creating a new review with deconstructed data
    if (validationErrors.isEmpty()) {
        const newReview = await Review.build({
            userId,
            hauntId,
            review,
            score
        });

        if (newReview) {
            newReview.save();
            res.redirect(`/haunts/${hauntId}`);
        }
        errors.push("Review failed");
    } else {
        errors = validationErrors.array().map(err => err.msg);
    }
    res.render("reviews", { review, score, haunt, csrfToken: req.csrfToken(), errors }); // might need to feed hauntId
}));


// EDIT review data
router.put('/edit/:id(\\d+)', csrfProtection, reviewValidator, asyncHandler(async(req, res) => {

    const reviewId = req.params.id;
    const review = await Review.findByPk(+reviewId);

    const validationErrors = validationResult(req);
    let errors = [];
    // await creating a new review with deconstructed data
    if (validationErrors.isEmpty()) {
    // if the review was found, then
        if (review) {
            const { userId, hauntId, review, score } = req.body;
            await review.update({
                userId, hauntId, review, score
            });
            res.redirect(`/haunts/${+hauntId}`);
        } else {
            errors = validationErrors.array().map(err => err.msg);
        }
        errors.push("Review edit failed");
    }
    res.render("reviews", { review, score, haunt, csrfToken: req.csrfToken(), errors });
}));

// DELETE review
router.delete('/:id(\\d+)', asyncHandler(async((req, res, next) => {
    console.log('blah');
})));



module.exports = router;
