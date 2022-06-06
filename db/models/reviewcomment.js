'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewComment = sequelize.define('ReviewComment', {
    userId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  ReviewComment.associate = function(models) {
    // associations can be defined here
    ReviewComment.belongsTo(models.Review, { foreignKey: 'reviewId' })
    ReviewComment.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return ReviewComment;
};
