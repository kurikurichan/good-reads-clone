'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('reviewComments', [
    {
      userId: 1,
      reviewId: 1,
      comment: "I've never thought of it that way before",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      reviewId: 2,
      comment: "That's such an interesting way to think of it!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      reviewId: 3,
      comment: "I'd have to disagree.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      reviewId: 2,
      comment: "Are you out of your mind?",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      reviewId: 3,
      comment: "I'm not so sure about that...",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('reviewComments', null, {});
  }
};
