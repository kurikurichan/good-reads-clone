var express = require("express");
var router = express.Router();

const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils");

// grab a hauntlist???
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const hauntListId = req.params.id; //grab the id
    const hauntList = await db.HauntList.findOne({
      where: { id: hauntListId },
      include: [{ model: db.Haunt }],
    });
    console.log("hauntList", hauntList);
    const haunts = hauntList.Haunts;
    // const haunts = await db.Haunt.findAll({
    //   where: { id: hauntListId }, //fix finding haunts in hauntlist
    //   include: [{ model: db.HauntList }],
    // });
    res.render("hauntlist", { haunts, hauntList });
  })
);

//create a hauntlist
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { title, userId } = req.body;

    if (req.session.auth && req.session.auth.userId == userId) {
      await db.HauntList.create({
        title,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  })
);

//Delete haunt from hauntlist (destroy the join table)
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
    res.status(200).end();
  })
);

// add a haunt to a hauntlist (this is made for the haunts/:id page)
// user is clicking a button that sends the request for each time they want to add haunt to hauntlist
router.post(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const hauntId = req.params.id;
    const hauntListId = req.body.hauntId; // OR retrieve button id/option id via dom selector
    console.log("Hauntlist", hauntListId);
    console.log("Haunt", hauntId);

    const dupCheck = await db.HauntJoinList.findOne({
      where: {
        hauntId,
        hauntListId,
      },
    });

    if (!dupCheck) {
      await db.HauntJoinList.create({
        hauntListId,
        hauntId,
      });
      res.status(201).end();
    } else {
    }
  })
);

router.delete(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    // const hauntListId = req.body.id
    const hauntListId = req.params.id;
    console.log("THIS IS THE HAUNTLIST ID", hauntListId);
    const hauntList = await db.HauntList.findByPk(hauntListId);

    if (hauntList) {
      await hauntList.destroy();
      console.log("destroyed");
      res.end();
    }
    res.end();
  })
);

// fetch request to add to front end for each button click to add a haunt to the haunt list
/*
(async function() {
  const addToHauntList = await fetch(`/hauntlists/${hauntListId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return addToHauntList.json();
});
*/

module.exports = router;
