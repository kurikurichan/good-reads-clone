'use strict';
module.exports = (sequelize, DataTypes) => {
  const GenreType = sequelize.define('GenreType', {
    type: DataTypes.STRING
  }, {});
  GenreType.associate = function(models) {
    // associations can be defined here
    GenreType.hasMany(models.Haunt, { foreignKey: 'genreId' })
  };
  return GenreType;
};
