const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/:userId/allusers', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: `${req.user.email}`,
        id: `${req.user.id}`
      }
    })
    if (user.isAdmin) {
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

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
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
router.post('/:userId/cart', async (req, res, next) => {
  try {
    const newCart = await Order.create()
    const user = await User.findByPk(req.params.userId)
    newCart.setUser(user)
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart', async (req, res, next) => {
  try {
    let getCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        inProgress: true
      },
      include: {
        model: Product
      }
    })

    if (getCart === null) {
      const user = await User.findByPk(req.params.userId)
      getCart = await Order.create()
      await getCart.setUser(user)
    }

    const foundProduct = await Product.findByPk(req.body.productId)
    const order = await getCart.addProduct(foundProduct)

    getCart.totalPrice = getCart.totalPrice + foundProduct.price
    await getCart.save()

    if (order === undefined) {
      getCart.products.forEach(async product => {
        if (product.id === foundProduct.id) {
          product.itemsInOrder.quantity = product.itemsInOrder.quantity + 1
          await product.itemsInOrder.save()
          res.json(product).status(204)
          return null
        }
      })
    } else {
      const newCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          inProgress: true
        },
        include: {
          model: Product
        }
      })

      newCart.products.forEach(product => {
        if (product.id === foundProduct.id) {
          res.json(product).status(204)
          return null
        }
      })
      console.log('bad thing happen')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/cart-update', async (req, res, next) => {
  try {
    const getCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        inProgress: true
      },
      include: {
        model: Product
      }
    })

    getCart.products.forEach(async product => {
      if (product.id === req.body.productId) {
        const oldQuant = product.itemsInOrder.quantity
        const change = req.body.quantity - oldQuant
        product.itemsInOrder.quantity = product.itemsInOrder.quantity + change
        await product.itemsInOrder.save()
        res.json(product.itemsInOrder.quantity).status(204)
      }
    })
  } catch (error) {
    next(error)
  }
})

// remove product from cart
router.put('/:userId/cart-remove/', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
})

//find orders in progress
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const getCart = await Order.findOne({
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

router.put('/:userId/checkout', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
})
