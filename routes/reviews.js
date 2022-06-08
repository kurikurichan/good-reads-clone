var express = require("express");
var router = express.Router();

const { Haunt, Review } = require('../db/models');
const { asyncHandler, csrfProtection } = require("./utils");
const { check, validationResult } = require("express-validator");


// GET page with form for new review
// Id is the id of the haunt the review will be on
router.get('/new/:id(\\d+)', csrfProtection, asyncHandler(async(req, res, next) => {

    const hauntId = req.params.id;
    const haunt = await Haunt.findByPk(+hauntId);

    res.render('reviews', { title: "wow a review", csrfToken: req.csrfToken(), haunt });

}));

// POST new review data
router.post('/', asyncHandler(async(req, res) => {
    //TODO: deconstruct form data from review
    console.log("Post new review filler");

    // TODO: await creating a new review with deconstructed data
    // const haunt = await Haunt.findByPk(id);
    // TODO: redirect user to haunts/:id page
    res.redirect('/');
}));

// EDIT review data
// router.put('/:id(\\d+)', asyncHandler(async(req, res) => {

//     const id = req.params.id;
//     console.log("the id: ", typeof id);
//     const haunt = await Haunt.findByPk(id);

//     res.render('haunts', { something: [] });
// }));


module.exports = router;
