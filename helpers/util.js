module.exports = {
  totalPrice(items) {
    let totalPrice = 0;
    for (let i=0; i<items.length; i++) {
      totalPrice += parseInt(items[i].price);
    }
    return totalPrice;
  }
};
