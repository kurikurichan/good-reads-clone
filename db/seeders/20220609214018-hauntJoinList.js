"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "HauntJoinLists",
      [
        {
          hauntListId: 1,
          hauntId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hauntListId: 1,
          hauntId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hauntListId: 1,
          hauntId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("HauntJoinLists", null, {});
  },
};
