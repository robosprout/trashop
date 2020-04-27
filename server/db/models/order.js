const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('order', {
  inProgress: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0.0
  }
})

//class methods/hooks
// Order.afterUpdate(async (cartInstance) => {
//   //if there is at least 1 item in the items array
//   const orders = await cartInstance.getProducts()
//   if (orders.products[0]) {
//     //use 'reduce' array method to calculate the total price of items in our items array
//     cartInstance.totalPrice = orders.products.reduce((acc, cur) => {
//       return acc + cur.price
//     }, 0.00)
//   } else {
//     return 0.00
//   }
// })

module.exports = Order
