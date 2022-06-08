var express = require("express");
var router = express.Router();

const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils");

//import model genre types
// for each genre type
// create an array called haunts
// haunts.forEach      for each genre from the model
// hauntSubArray = db.Haunt.findAll({
//   where: { genre: INDEX}
// })

// push  hauntSubArray into haunts.

/* GET users listing. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const haunts = await db.Haunt.findAll({
      where: {
        genreId: 1,
      },
    });
    const haunts2 = await db.Haunt.findAll({
      where: {
        genreId: 2,
      },
    });

    const haunts3 = await db.Haunt.findAll({
      where: {
        genreId: 4, // remember this is FOUR
      },
    });

    res.render("haunts", {
      haunts,
      haunts2,
      haunts3,
    });
  })
);

const reviews = [
  // FARKEREVIEWS
  {
    score: 3,
    description: "blah blah blah",
  },
  {
    score: 4,
    description: "blasdfasah blah blah",
  },
  {
    score: 2,
    description: "blah blah blsdfasah",
  },
];

router.get("/:id(\\d+)", async (req, res, next) => {
  const hauntId = req.params.id; //grab the id
  const haunt = await db.Haunt.findByPk(hauntId);
  res.render("specificHaunt", { haunt, reviews });
});

module.exports = router;
