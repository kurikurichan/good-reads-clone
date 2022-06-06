'use strict';
module.exports = (sequelize, DataTypes) => {
  const Haunt = sequelize.define('Haunt', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    score: {
      type: DataTypes.NUMERIC(3,2),
      validate: {
        min: 0,
        max: 5
      }
    },
    genreId: DataTypes.INTEGER
  }, {});
  Haunt.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'HauntJoinList',
      otherKey: 'hauntListId',
      foreignKey: 'hauntId'
    }

    Haunt.belongsTo(models.GenreType, { foreignKey: 'genreId' })
    Haunt.hasMany(models.Review, { foreignKey: 'hauntId' })

    Haunt.belongsToMany(models.HauntList, columnMapping);


  };
  return Haunt;
};
