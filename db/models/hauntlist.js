'use strict';
module.exports = (sequelize, DataTypes) => {
  const HauntList = sequelize.define('HauntList', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  HauntList.associate = function(models) {
    // associations can be defined here

    const columnMapping = {
      through: 'HauntJoinList',
      otherKey: 'hauntId',
      foreignKey: 'hauntListId'
    }

    HauntList.belongsTo(models.User, { foreignKey: 'userId' })
    HauntList.belongsToMany(models.Haunt, columnMapping);
  };
  return HauntList;
};
