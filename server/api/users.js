/* eslint-disable max-statements */
/* eslint-disable guard-for-in */
const router = require('express').Router()
const {User, Order, Product} = require('../db/models')

module.exports = router

//admin can see all users
router.get('/:userId/allusers', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const allusers = await User.findAll({
        attributes: ['username', 'id', 'email', 'isAdmin']
      })
      res.json(allusers)
    } else {
      res.send('Nothing to see here!').status(404)
    }
  } catch (err) {
    next(err)
  }
})

//admin/logged in user can view single user profile
router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.params.userId, 10) || req.user.isAdmin) {
      const user = await User.findOne({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        where: {id: req.params.userId},
        attributes: ['id', 'email', 'isAdmin']
      })
      res.json(user)
    } else {
      throw new Error("Couldn't find that please try again")
    }
  } catch (err) {
    next(err)
  }
})

//admin/logged in user can delete user
router.delete('/:userId', async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.params.userId, 10) || req.user.isAdmin) {
      const user = await User.findOne({
        where: {id: req.params.id}
      })
      user.destroy()
      res.send('User Successfully Deleted').status(202)
    } else {
      throw new Error('Error deleting user')
    }
  } catch (err) {
    next(err)
  }
})

//admin/logged in users can update user info
router.put('/:userId', async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.params.userId, 10) || req.user.isAdmin) {
      const user = await User.findOne({
        where: {id: req.params.id}
      })
      user.update({
        username: req.body.username,
        email: req.body.email,
        imageUrl: req.body.imageUrl
      })
    }
  } catch (err) {
    next(err)
  }
})

//Below is cart/order/checkout stuff

router.get('/:userId/orders', async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.params.userId, 10) || req.user.isAdmin) {
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
    } else {
      throw new Error("Whoops! Couldn't find that!")
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.params.userId, 10)) {
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
    if (req.user.id === parseInt(req.params.userId, 10) || req.user.isAdmin) {
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
    } else {
      throw new Error('Error updating cart')
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
    if (req.user.id === parseInt(req.params.userId, 10)) {
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
    if (req.user.id === parseInt(req.params.userId, 10) || req.user.isAdmin) {
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
    } else {
      throw new Error('Error finding cart please try again')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.params.userId, 10)) {
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
      addedProduct[0].price = foundProduct.price
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
        addedProduct[0].quantity = guestCart[key].quantity
        addedProduct[0].price = guestCart[key].price
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
              product.itemsInOrder.price = foundProduct.price
              await product.itemsInOrder.save()
            }
          })
        } else {
          addedProduct[0].quantity = guestCart[key].quantity
          addedProduct[0].price = guestCart[key].price
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
