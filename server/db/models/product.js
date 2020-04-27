const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  //One model for all products, with a property to specify category
  category: {
    type: Sequelize.ENUM('trash', 'car', 'island', 'town'),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://previews.123rf.com/images/larryrains/larryrains1903/larryrains190300054/120066912-trash-can-mascot-running-with-money-a-vector-cartoon-illustration-of-a-aluminum-trash-can-mascot-run.jpg'
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product
