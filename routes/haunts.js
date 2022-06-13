var express = require("express");
var router = express.Router();

const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils");
const { averageScore } = require('../auth.js');

console.log(averageScore);

/* GET users listing. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {

    // get all genres
    // returns array of objects
    const genreList = await db.GenreType.findAll();

    // array to store haunt objects in
    let haunts = [];

    // populate haunts array with Haunt objects that include GenreType

    for (let genre of genreList) {
      const hauntWithGenreType = await db.Haunt.findAll({
        where: { genreId: genre.id },
        include: [
          {
            model: db.GenreType
          }
        ]
      });

      await averageScore(hauntWithGenreType[0].id);
      haunts.push(hauntWithGenreType);
    }

    res.render("haunts", {
      haunts
    });
  })
);

router.get("/:id(\\d+)", async (req, res, next) => {
  const hauntId = req.params.id; //grab the id
  const haunt = await db.Haunt.findByPk(hauntId);
  const reviews = await db.Review.findAll({
    where: { hauntId: haunt.id },
    include: [{ model: db.User }],
  });

  let hauntlists;
  if (req.session.auth) {
    hauntlists = await db.HauntList.findAll({
      where: { userId: req.session.auth.userId },
    });
  }
  res.render("specificHaunt", { haunt, reviews, hauntlists });
});

// redirect to reviews router hopefully
router.get("/reviews/edit/:id(\\d+)", async (req, res, next) => {
  const reviewId = req.params.id; //grab the id

  res.redirect(`reviews/edit/${reviewId}`);
});

module.exports = router;
