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

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const hauntListId = req.params.id;
    const hauntsToDelete = await req.body;
    console.log("hauntsToDelete", hauntsToDelete);
    const hauntJoinLists = await db.HauntJoinList.findAll({
      where: { hauntListId },
    });
    console.log("hauntJoinLists", hauntJoinLists);
    hauntJoinLists.forEach(joinList => {
      joinList.destroy();
    });
  })
);

module.exports = router;
