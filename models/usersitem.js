'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersitem = sequelize.define('usersitem', {
    item_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        usersitem.belongsTo(models.user, {
          foreignKey:"user_id"
        }),
          usersitem.belongsTo(models.item, {
            foreignKey:"item_id"
          });
      }
    }
  });
  return usersitem;
};
