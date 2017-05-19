'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersitem = sequelize.define('usersitem', {
    itemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        usersitem.belongsTo(models.user, {
          foreignKey:"userId"
        });
        usersitem.belongsTo(models.item, {
          foreignKey:"itemId"
        });
      }
    }
  });
  return usersitem;
};
