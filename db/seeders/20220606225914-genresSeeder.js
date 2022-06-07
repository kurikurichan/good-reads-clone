'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('GenreTypes', [
        {type: "Historical", createdAt: new Date(), updatedAt: new Date()},
        {type: "Outdoors", createdAt: new Date(), updatedAt: new Date()},
        {type: "Hotel", createdAt: new Date(), updatedAt: new Date()},
        {type: "Asylum", createdAt: new Date(), updatedAt: new Date()},
        {type: "House", createdAt: new Date(), updatedAt: new Date()},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('GenreTypes', null, {});
  }
};
