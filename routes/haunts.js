var express = require('express');
var router = express.Router();

const db = require('../db/models')

const { csrfProtection, asyncHandler } = require('./utils');

//import model genre types
// for each genre type
// create an array called haunts
// haunts.forEach      for each genre from the model
// hauntSubArray = db.Haunt.findAll({
//   where: { genre: INDEX}
// })

// push  hauntSubArray into haunts.

/* GET users listing. */
router.get('/', asyncHandler( async (req, res, next) => {
  const haunts = await db.Haunt.findAll({
    where: {
      genreId: 1
    }
  })
  const haunts2 = await db.Haunt.findAll({
    where: {
      genreId: 2
    }
  })

  const haunts3 = await db.Haunt.findAll({
    where: {
      genreId: 4   // remember this is FOUR
    }
  })

  res.render('haunts', {
    haunts,
    haunts2,
    haunts3
  });

}));




//  ///haunts/:hauntId(\\d+)  ??   for later on to get ONE haunt


//a(href="/haunts/" + haunt.id) click to a specific haunt

module.exports = router;