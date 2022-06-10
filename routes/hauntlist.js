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
    const haunts = hauntList.Haunts;
    // const haunts = await db.Haunt.findAll({
    //   where: { id: hauntListId }, //fix finding haunts in hauntlist
    //   include: [{ model: db.HauntList }],
    // });
    res.render("hauntlist", { haunts, hauntList });
  })
);

router.patch(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const hauntListId = req.params.id;
    const hauntId = req.body.hauntId;

    const hauntJoinList = await db.HauntJoinList.findOne({
      where: { hauntListId, hauntId },
    });
    hauntJoinList.destroy();
    console.log("destroyed");
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    // const hauntListId = req.body.id
    const hauntListId = req.params.id;
    console.log("THIS IS THE HAUNTLIST ID", hauntListId)
    const hauntList = await db.HauntList.findByPk(hauntListId)

  if(hauntList){

    await hauntList.destroy();
    console.log("destroyed")
    res.end()
  }
  res.end()
  })
)
module.exports = router;
