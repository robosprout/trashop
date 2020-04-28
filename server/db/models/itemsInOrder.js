const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const db = require('../db')
const Sequelize = require('sequelize')

const ItemsInOrder = db.define('itemsInOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = ItemsInOrder
