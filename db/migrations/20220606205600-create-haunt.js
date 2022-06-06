'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Haunts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING(95),
        unique: true,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      score: {
        type: Sequelize.NUMERIC(3, 2)
      },
      genreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'GenreTypes' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Haunts');
  }
};
