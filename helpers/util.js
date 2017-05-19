const db = require('../models');

module.exports = {
  totalPrice(items) {
    let totalPrice = 0;
    for (let i=0; i<items.length; i++) {
      totalPrice += parseInt(items[i].price);
    }
    return totalPrice;
  },
  quantity(items,db) {
    let countItems = [];
    items.forEach(item => {
      db.usersitem.count({where: {'item_id':item.id}})
        .then (total => {
          countItems.push(total);
          console.log(countItems);
          return countItems;
        });
    });
  }
};
