const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const db = require('../db')
const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

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
  Order
}
