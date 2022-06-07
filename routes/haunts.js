var express = require('express');
var router = express.Router();

const db = require('../db/models')

const { csrfProtection, asyncHandler } = require('./utils');



/* GET users listing. */
router.get('/', asyncHandler( async (req, res, next) => {
  const haunts = await db.Haunt.findAll()
  res.render('haunts', {haunts});
}));

//  ///haunts/:hauntId(\\d+)  ??   for later on to get ONE haunt

module.exports = router;
