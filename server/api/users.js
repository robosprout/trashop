/* eslint-disable max-statements */
/* eslint-disable guard-for-in */
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
        userId: req.params.userId,
        inProgress: false
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
          product.itemsInOrder.price = foundProduct.price
          await product.itemsInOrder.save()
          res.json(product).status(204)
          return null
        }
      })
    } else {
      order[0].price = foundProduct.price
      await order[0].save()
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
    const foundProduct = await Product.findByPk(req.body.productId)
    await getCart.removeProduct(foundProduct)
    getCart.totalPrice =
      getCart.totalPrice - foundProduct.price * req.body.quantity
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

router.post('/:userId/newGuestCart', async (req, res, next) => {
  try {
    const newCart = await Order.create()
    const user = await User.findByPk(req.params.userId)
    newCart.setUser(user)
    const guestCart = req.body.guestCart
    for (let key in guestCart) {
      let foundProduct = await Product.findByPk(guestCart[key].id)
      const addedProduct = await newCart.addProduct(foundProduct)
      console.log(addedProduct[0].quantity)
      console.log(guestCart[key].quantity)
      addedProduct[0].quantity = guestCart[key].quantity
      await addedProduct[0].save()
      newCart.totalPrice += foundProduct.price * guestCart[key].quantity
      await newCart.save()
    }
    await newCart.save()
    const findCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        inProgress: true
      },
      include: {
        model: Product
      }
    })
    res.json(findCart)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/loggedInCart', async (req, res, next) => {
  try {
    let newCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        inProgress: true
      },
      include: {
        model: Product
      }
    })
    if (!newCart) {
      newCart = await Order.create()
      const user = await User.findByPk(req.params.userId)
      newCart.setUser(user)
      const guestCart = req.body.guestCart
      for (let key in guestCart) {
        let foundProduct = await Product.findByPk(guestCart[key].id)
        const addedProduct = await newCart.addProduct(foundProduct)
        console.log(addedProduct[0].quantity)
        console.log(guestCart[key].quantity)
        addedProduct[0].quantity = guestCart[key].quantity
        await addedProduct[0].save()
        newCart.totalPrice += foundProduct.price * guestCart[key].quantity
        await newCart.save()
      }
      await newCart.save()
      const findCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          inProgress: true
        },
        include: {
          model: Product
        }
      })
      res.json(findCart)
    } else {
      const guestCart = req.body.guestCart
      for (let key in guestCart) {
        let foundProduct = await Product.findByPk(guestCart[key].id)
        const addedProduct = await newCart.addProduct(foundProduct)
        if (addedProduct === undefined) {
          newCart.products.forEach(async product => {
            if (product.id === foundProduct.id) {
              product.itemsInOrder.quantity =
                product.itemsInOrder.quantity + guestCart[key].quantity
              await product.itemsInOrder.save()
            }
          })
        } else {
          addedProduct[0].quantity = guestCart[key].quantity
          await addedProduct[0].save()
          console.log(addedProduct[0].quantity)
          console.log(guestCart[key].quantity)
        }

        newCart.totalPrice += foundProduct.price * guestCart[key].quantity
        await newCart.save()
      }
      const findCart = await Order.findOne({
        where: {
          userId: req.params.userId,
          inProgress: true
        },
        include: {
          model: Product
        }
      })
      res.json(findCart)
    }
  } catch (error) {
    next(error)
  }
})
