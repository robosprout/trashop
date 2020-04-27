const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const db = require('../db')
const ItemsInOrder = require('./itemsInOrder')
const Sequelize = require('sequelize')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {
  through: {
    model: ItemsInOrder
  }
})
Product.belongsToMany(Order, {
  through: {
    model: ItemsInOrder
  }
})

module.exports = {
  User,
  Product,
  Order,
  ItemsInOrder
}
