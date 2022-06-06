'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    hauntId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    score: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.Haunt, { foreignKey: 'hauntId' })

    Review.hasMany(models.ReviewComment, { foreignKey: 'reviewId' })
  };
  return Review;
};
