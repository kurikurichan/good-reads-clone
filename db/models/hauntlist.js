'use strict';
module.exports = (sequelize, DataTypes) => {
  const HauntList = sequelize.define('HauntList', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  HauntList.associate = function(models) {
    // associations can be defined here
    HauntList.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return HauntList;
};
