var express = require("express");
var router = express.Router();

const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils");

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const hauntListId = req.params.id; //grab the id
    const hauntList = await db.HauntList.findOne({
      where: { id: hauntListId },
      include: [{ model: db.Haunt }],
    });
    console.log("hauntList", hauntList);
    const haunts = await db.Haunt.findAll({
      where: { id: hauntListId }, //fix finding haunts in hauntlist
      include: [{ model: db.HauntList }],
    });
    res.render("hauntlist", { haunts, hauntList });
  })
);

module.exports = router;
