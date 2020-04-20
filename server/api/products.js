const router = require('express').Router()
const {Products} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Products.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Products.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updateCampus = await Products.findByPk(req.params.id)
    await updateCampus.update(req.body)
    res.json(updateCampus)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Products.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
