var express = require("express");
var router = express.Router();

const db = require("../db/models");

const { check, validationResult } = require("express-validator");
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
    const haunts = hauntList.Haunts;

    res.render("hauntlist", { haunts, hauntList });
  })
);

// const newHauntlistValidator = [
//   check("title")
//     .exists({ checkFalsy: true })
//     .withMessage("Must provide a title")
//     .isLength({ max: 30 })
//     .withMessage("Title can't be more than 30 characters"),
// ];

//create a hauntlist
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const { title } = req.body;
    let userId;
    //check if is a logged in user
    if (req.session.auth) {
      userId = req.session.auth.userId;
    } else res.status(401).end();

    // const validationErrors = validationResult(req);
    const errors = [];
    if (!title) errors.push("Must provide a title!");
    if (title.length > 30)
      errors.push("Title can't be more than 30 characters!");

    if (!errors.length) {

      const newHauntlist = await db.HauntList.create({
        title,
        userId,
      });
      res.status(201);
      res.json({ newId: JSON.stringify(newHauntlist) }).end();

    } else {
      // const errors = validationErrors.array().map(err => err.msg);
      res.status(200);
      res
        .json({
          errors: JSON.stringify(errors),
        })
        .end();
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
    const hauntList = await db.HauntList.findByPk(hauntListId);

    if (hauntList) {
      await hauntList.destroy();
      res.end();
    }
    res.end();
  })
);



module.exports = router;
