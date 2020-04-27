const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/:userId/allusers', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const allusers = await User.findAll({
        attributes: ['id', 'email', 'isAdmin']
      })
      res.json(allusers)
    } else {
      res.send('Nothing to see here!').status(404)
    }
  } catch (err) {
    next(err)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email', 'isAdmin']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:userId/orders', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      const getOrders = await Order.findAll({
        where: {
          userId: req.params.userId
        },
        include: {
          model: Product
        }
      })
      res.json(getOrders)
    } else {
      throw new Error("Whoops! Couldn't find that!")
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const newCart = await Order.create()
      const user = await User.findByPk(req.params.userId)
      newCart.setUser(user)
      res.json(newCart)
    } else {
      throw new Error('Creating new order failed')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    console.log('----->', req.params.userId)
    if (req.user.id === req.params.userId) {
      const getCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          inProgress: true
        },
        include: {
          model: Product
        }
      })
      const foundProduct = await Product.findByPk(req.body.id)
      const order = await getCart.addProduct(foundProduct)
      if (order === undefined) {
        getCart.products.forEach(async product => {
          if (product.id === foundProduct.id) {
            product.itemsInOrder.quantity = product.itemsInOrder.quantity + 1
            await product.itemsInOrder.save()
          }
        })
      }
      getCart.totalPrice = getCart.totalPrice + foundProduct.price
      await getCart.save()
      const newCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          inProgress: true
        },
        include: {
          model: Product
        }
      })
      res.json(newCart)
    } else {
      throw new Error('Error Adding to Cart')
    }
  } catch (error) {
    next(error)
  }
})

// remove product from cart
router.put('/:userId/cart-remove/', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const getCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          inProgress: true
        },
        include: {
          model: Product
        }
      })
      const foundProduct = await Product.findByPk(req.body.id)
      await getCart.removeProduct(foundProduct)
      getCart.totalPrice = getCart.totalPrice - foundProduct.price
      getCart.save()
      res.json(getCart)
    } else {
      throw new Error('Error Removing from Cart')
    }
  } catch (error) {
    next(error)
  }
})

//find orders in progress
router.get('/:userId/cart', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
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
    } else {
      throw new Error('Error finding cart')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      const order = await Order.findAll({
        where: {
          userId: req.params.userId,
          inProgress: true
        },
        include: {
          model: Product
        }
      })
      order[0].inProgress = false
      await order[0].save()
      res.sendStatus(204)
    } else {
      throw new Error('Error completing transaction, please try again!')
    }
  } catch (error) {
    next(error)
  }
})
