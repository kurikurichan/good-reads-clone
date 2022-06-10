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
    const hauntsToDelete = await req.body; // returns an array of hauntIds to delete
    console.log("REQ.BODY--------------: ", req.body)
    console.log("HAUNTS TO DELETE ----------", hauntsToDelete);

    // step 1: loop over haunts to delete
    // step 2: in for loop, find 1 where the haunt to delete = haunts where hauntlistId = haunttodelete number
    // step 3: when we find that item, have it destroyed
    hauntsToDelete.forEach(async (hauntId) => {

      const hauntJoinList = await db.HauntJoinList.findOne({
        where: { hauntListId: hauntId },
      });

      hauntJoinList.destroy();
      console.log('destroyed');

    });
  })
);

module.exports = router;
