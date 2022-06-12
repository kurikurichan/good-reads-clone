var express = require("express");
var router = express.Router();

const { Haunt, Review } = require('../db/models');
const { asyncHandler, csrfProtection } = require("./utils");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");


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

// Helper function to calculate and average review average scores
async function averageScore(hauntId) {
    // parameter is integer hauntId (Review.hauntId or Haunt.id)
    // returns void - should just update the Haunt instance

    const hauntToUpdate = await Haunt.findByPk(hauntId);

    const hauntReviews = await Review.findAll({
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


// GET page with form for new review
// Id is the id of the haunt the review will be on
// use the '+' with findByPk to turn string into a number (unary plus operator)
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
            await newReview.save();
            await averageScore(+hauntId);
            req.method = "GET";
            return res.redirect(`/haunts/${+hauntId}`);
        }
        else errors.push("Review failed");
    } else {
        errors = validationErrors.array().map(err => err.msg);
    }
    res.render("reviews", { review, score, haunt, csrfToken: req.csrfToken(), errors }); // might need to feed hauntId
}));


//get editing form

router.get('/edit/:id(\\d+)', csrfProtection, reviewValidator, asyncHandler(async(req, res) => {

    const reviewId = req.params.id;
    const currentReview = await Review.findByPk(+reviewId);
    const { userId, hauntId, review, score } = currentReview;
    const haunt = await Haunt.findByPk(+hauntId);



    res.render("edit-review", { reviewId, review, score, haunt, csrfToken: req.csrfToken() });


}));


// EDIT review data - /reviews/:reviewId
router.post('/:id(\\d+)', csrfProtection, reviewValidator, asyncHandler(async(req, res) => {
    //TODO: deconstruct form data from review
    const reviewId = req.params.id;
    const { userId, hauntId, score, review } = req.body;
    const reviewToUpdate = await Review.findByPk(+reviewId)
    const haunt = await Haunt.findByPk(+hauntId);

    const validationErrors = validationResult(req);
    let errors = [];
    // await creating a new review with deconstructed data
    if (validationErrors.isEmpty()) {
        await reviewToUpdate.update({
            reviewId,
            userId,
            hauntId,
            review,
            score
        });

        if (reviewToUpdate) {
            await reviewToUpdate.save();
            await averageScore(+hauntId);
            req.method = "GET";
            return res.redirect(`/haunts/${+hauntId}`);
        }
        errors.push("Editing failed");
    } else {
        errors = validationErrors.array().map(err => err.msg);
    }
    res.render("edit-review", { review, score, haunt, csrfToken: req.csrfToken(), errors }); // might need to feed hauntId
}));

// DELETE review
router.delete('/:id(\\d+)', asyncHandler(async(req, res, next) => {

    const reviewId = req.params.id;
    const review = await Review.findByPk(+reviewId);
    const hauntId = review.hauntId;

    if (review) {

        await review.destroy();
        req.method = "GET";
        return res.redirect(`/haunts/${+hauntId}`);

    } else {
        const err = Error(`Review with an id of ${reviewId} could not be found.`);
        err.title = "Review not found.";
        err.status = 404;
        return err;
    }
}));



module.exports = router;
