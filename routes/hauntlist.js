var express = require("express");
var router = express.Router();

const db = require("../db/models");

const { csrfProtection, asyncHandler } = require("./utils");

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const hauntListId = req.params.id; //grab the id
    const hauntList = await db.HauntList.findByPk(hauntListId);
    const haunts = await db.Haunt.findAll({
      where: { id: hauntListId },
      include: [{ model: db.HauntList }],
    });
    res.render("hauntlist", { haunts, hauntList });
  })
);

module.exports = router;
