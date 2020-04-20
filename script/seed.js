'use strict'

const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

//10 users in users array, animals/simpsons at email.com/net with password 123
  const users = await Promise.all([
    User.create({email: 'admin@email.com', password: '123', isAdmin: true}),
    User.create({email: 'dog@email.com', password: '123'}),
    User.create({email: 'cat@email.com', password: '123'}),
    User.create({email: 'bear@email.com', password: '123'}),
    User.create({email: 'pig@email.net', password: '123'}),
    User.create({email: 'bart@email.net', password: '123'}),
    User.create({email: 'lisa@email.net', password: '123'}),
    User.create({email: 'homer@email.net', password: '123'}),
    User.create({email: 'marge@email.net', password: '123'}),
    User.create({email: 'maggie@email.net', password: '123'})
  ])

//25 items in products array, first 10 are 'trash', then 5 'car', 5 'island' and 5 'town'  
  const products = await Promise.all([
    Product.create({category: 'trash', name: 'sponge', description: 'an old sponge', price: 99.99}),
    Product.create({category: 'trash', name: 'beercan', description: 'old crusty beer', price: 170.00}),
    Product.create({category: 'trash', name: 'broken plate', description: 'a beautiful broken plate', price: 89.50}),
    Product.create({category: 'trash', name: 'oatmeal', description: 'a bowl of rotting oatmeal', price: 50.10}),
    Product.create({category: 'trash', name: 'lightbulb', description: 'a burnt out lightbulb', price: 45.75}),
    Product.create({category: 'trash', name: 'coffee grounds', description: 'use coffee grounds', price: 59.99}),
    Product.create({category: 'trash', name: 'paintbrush', description: 'old crusty paintbrush', price: 250.00}),
    Product.create({category: 'trash', name: 'calendar', description: '2008 calendar (slightly crusty)', price: 70.70}),
    Product.create({category: 'trash', name: 'broken cup', description: 'classy cup with a hole in the bottom', price: 33.00}),
    Product.create({category: 'trash', name: 'empty box', description: 'empty cardboard box (mildly crusty)', price: 80.00}),
  ])

//Creating 1 cart for now  
  const carts = await Promise.all([
    Cart.create()
  ])
//using the 'magic' addProducts method created by the many to many relationship
  await carts[0].addProducts([products[0],products[0],products[1],products[2],products[8]])
//using the 'magic' setUser method created by the one to one relationship between Cart and User
  await carts[0].setUser(user[0])
//if this works like I think it should, now our user 'admin@email.com' will have one cart with 5 items in it 
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
