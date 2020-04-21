const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders/', async (req, res, next) => {
  try {
    const getOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: {
        model: Product
      }
    })
    res.json(getOrders)
  } catch (error) {
    next(error)
  }
})

//find orders in progress
router.get('/:userId/cart/', async (req, res, next) => {
  try {
    const getCart = await Order.findAll({
      where: {
        userId: req.params.userId,
        inProgress: true
      },
      include: {
        model: Product
      }
    })
    res.json(getCart)
  } catch (error) {
    next(error)
  }
})
