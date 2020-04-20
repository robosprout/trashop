const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Cart = db.define('cart', {
  items: {
    type: Sequelize.ARRAY,
    defaultValue: []
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0.00
  }
})
//instance methods
Cart.prototype.addItem = async function(itemId) {
  const item = await Product.findOne({where: {id: itemId}})

  //is pushing the item into the items array also asynchronous/need an 'await' ?
  this.items.push(item)
}
Cart.prototype.removeItem = async function(itemId) {}

//class methods/hooks
Cart.afterUpdate(async (cartInstance) => {
  //if there is at least 1 item in the items array
  if (cartInstance.items[0]) {
    //use 'reduce' array method to calculate the total price of items in our items array
    return cartInstance.items.reduce((acc, cur) => {
      return acc + cur.price
    }, 0.00)
  } else {
    return 0.00 
  }
})

module.exports = Cart;
