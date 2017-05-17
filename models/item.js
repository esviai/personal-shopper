'use strict';
module.exports = function(sequelize, DataTypes) {
  var item = sequelize.define('item', {
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.STRING,
    stock: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        item.belongsToMany(models.user, {through: 'usersitem'});
      }
    }
  });
  return item;
};
