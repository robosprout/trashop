const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct).status(202)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.update(req.body)
    // res.json(product)
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    // res.status(204).end()
    res.send('Product successfully deleted').status(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
