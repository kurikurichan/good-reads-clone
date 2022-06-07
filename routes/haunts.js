var express = require('express');
var router = express.Router();

const db = require('../db/models')

const { csrfProtection, asyncHandler } = require('./utils');



/* GET users listing. */
router.get('/', asyncHandler( async (req, res, next) => {
  const haunts = await db.Haunt.findAll({
    where: {
      genreId: 1
    }
  })
  // const haunts2 = await db.Haunt.findAll({
  //   where: {
  //     genreId: 2
  //   }
  // })
  res.render('haunts', {haunts});
  // res.render('haunts', {haunts2});
}));
// router.get('/', asyncHandler( async (req, res, next) => {
//   const haunts = await db.Haunt.findAll({
//     where: {
//       genreId: 2
//     }
//   })
//   res.render('haunts', {haunts});
// }));

//  ///haunts/:hauntId(\\d+)  ??   for later on to get ONE haunt


//a(href="/haunts/" + haunt.id) click to a specific haunt

module.exports = router;
