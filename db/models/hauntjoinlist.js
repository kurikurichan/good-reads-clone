'use strict';
module.exports = (sequelize, DataTypes) => {
  const HauntJoinList = sequelize.define('HauntJoinList', {
    hauntListId: DataTypes.INTEGER,
    hauntId: DataTypes.INTEGER
  }, {});
  HauntJoinList.associate = function(models) {
    // associations can be defined here

  };
  return HauntJoinList;
};
