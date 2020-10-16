'use strict'
const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  //10 users in users array, animals/simpsons at email.com/net with password 123
  const users = await Promise.all([
    User.create({
      username: 'bossman22',
      email: 'admin@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      username: 'notAdog1997',
      email: 'dog@email.com',
      password: '123'
    }),
    User.create({
      username: 'aleisterMeowley47',
      email: 'cat@email.com',
      password: '123'
    }),
    User.create({
      username: 'honeyboy400',
      email: 'bear@email.com',
      password: '123'
    }),
    User.create({
      username: 'KoRnSkater666',
      email: 'pig@email.net',
      password: '123'
    }),
    User.create({
      username: 'VirtualBart',
      email: 'bart@email.net',
      password: '123'
    }),
    User.create({
      username: 'Veg4Life',
      email: 'lisa@email.net',
      password: '123'
    }),
    User.create({
      username: 'AlexaDeleteAlexaDeleteDoh',
      email: 'homer@email.net',
      password: '123'
    }),
    User.create({
      username: 'motherOfTheYear4',
      email: 'marge@email.net',
      password: '123'
    }),
    User.create({
      username: 'aintyourbaby76',
      email: 'maggie@email.net',
      password: '123'
    })
  ])
  //
  // let price =
  //   Math.floor(Math.random() * 100000000) + Math.floor(Math.random() * 100)
  // Product.create({
  //   category: 'island',
  //   name: island,
  //   imageUrl: `/islandPhotos/${photoNum}.jpeg`,
  //   price: price
  // })
  const products = await Promise.all([
    Product.create({
      category: 'trash',
      name: '"Telescope"',
      description: 'Are we alone in the universe?',
      imageUrl: '/trash/11 telescope.JPG',
      price: 16000
    }),
    Product.create({
      category: 'trash',
      name: '"In The Place That You Live"',
      imageUrl: '/trash/1 in the place that you live.JPG',
      price: 9999
    }),
    Product.create({
      category: 'trash',
      name: '"The Ship"',
      description: 'A ship of the imagination',
      imageUrl: '/trash/2 the ship.JPG',
      price: 1700
    }),
    Product.create({
      category: 'trash',
      name: '"Cup of Gold"',
      description: 'The only way to enjoy the golden condiment',
      imageUrl: '/trash/3 mustard.JPG',
      price: 8900
    }),
    Product.create({
      category: 'trash',
      name: '"Vitamin Water"',
      description: "There's enough for everyone",
      imageUrl: '/trash/5 vitamin water.JPG',
      price: 1100
    }),
    Product.create({
      category: 'trash',
      name: '"Untitled Large Can"',
      description: 'Untitled Piece',
      imageUrl: '/trash/6 untitled large can.JPG',
      price: 4500
    }),
    Product.create({
      category: 'trash',
      name: '"Mother"',
      imageUrl: '/trash/23 mother.JPG',
      price: 70000
    }),
    Product.create({
      category: 'trash',
      name: '"The Plantman Knows"',
      description: 'He knows all',
      imageUrl: '/trash/7 garden thing.JPG',
      price: 9200
    }),
    Product.create({
      category: 'trash',
      name: '"Knowledge of the Eternal"',
      imageUrl: '/trash/8 wood.JPG',
      price: 11000
    }),
    Product.create({
      category: 'trash',
      name: '"Puppy"',
      imageUrl: '/trash/9 puppy.JPG',
      price: 20000
    }),
    Product.create({
      category: 'trash',
      name: '"Motion"',
      description: 'What moves a person is motion',
      imageUrl: '/trash/26 wheel.JPG',
      price: 140000
    }),
    Product.create({
      category: 'trash',
      name: '"The Perfect Heart"',
      imageUrl: '/trash/27 the perfect heart.JPG',
      price: 125000
    }),
    Product.create({
      category: 'trash',
      name: '"Fan in Bottle"',
      imageUrl: '/trash/10 fan in bottle.JPG',
      price: 25000
    }),
    Product.create({
      category: 'trash',
      name: '"Holding"',
      imageUrl: '/trash/12 you holding.JPG',
      price: 12000
    }),
    Product.create({
      category: 'trash',
      name: '"Spaceship"',
      imageUrl: '/trash/24 spaceship.JPG',
      price: 95000
    }),
    Product.create({
      category: 'trash',
      name: '"Home"',
      imageUrl: '/trash/13 home.JPG',
      price: 6500
    }),
    Product.create({
      category: 'trash',
      name: '"Clock"',
      description: 'Does anybody really know what time it is?',
      imageUrl: '/trash/14 clock.JPG',
      price: 7500
    }),
    Product.create({
      category: 'trash',
      name: '"A Dead Fish"',
      description: 'A Dead Fish gains the power of observation',
      imageUrl: '/trash/15 a dead fish.JPG',
      price: 13500
    }),
    Product.create({
      category: 'trash',
      name: '"Jesus\'s Cup of Love"',
      description: "There's enough for everyone",
      imageUrl: '/trash/4 cup.JPG',
      price: 5500
    }),
    Product.create({
      category: 'trash',
      name: '"Butterfly"',
      description:
        "Today's the day when I see clear, a tiny thread of smoke appears",
      imageUrl: '/trash/16 butterfly.JPG',
      price: 22500
    }),
    Product.create({
      category: 'trash',
      name: '"Lemming"',
      imageUrl: '/trash/17 lemming.JPG',
      price: 50000
    }),
    Product.create({
      category: 'trash',
      name: '"Patience"',
      description: '',
      imageUrl: '/trash/18 patience.JPG',
      price: 40000
    }),
    Product.create({
      category: 'trash',
      name: '"Mento"',
      imageUrl: '/trash/19.JPG',
      price: 30000
    }),
    Product.create({
      category: 'trash',
      name: '"The Sphere"',
      imageUrl: '/trash/20 sphere.JPG',
      price: 50000
    }),
    Product.create({
      category: 'trash',
      name: '"Soldier"',
      imageUrl: '/trash/21 soldier.JPG',
      price: 70000
    }),
    Product.create({
      category: 'trash',
      name: '"Pipe"',
      imageUrl: '/trash/22 pipe.JPG',
      price: 45000
    }),
    Product.create({
      category: 'trash',
      name: '"Fifty Seven"',
      imageUrl: '/trash/25 fiftyseven.JPG',
      price: 40000
    }),
    Product.create({
      category: 'trash',
      name: '"Percussion"',
      description: 'Fragility requires respect',
      imageUrl: '/trash/28 percussion.JPG',
      price: 280000
    })
  ])
  // //uncomment lines below for islands
  // // //100 island names
  // const islandNames = [
  //   'Lacinia',
  //   'Amet',
  //   'Neque',
  //   'Sit',
  //   'Platea',
  //   'Aenean',
  //   'Bornst',
  //   'Proin',
  //   'Maecenas',
  //   'Nisi',
  //   'Facilisi',
  //   'Orci',
  //   'Coragorsha',
  //   'Aliquet',
  //   'Forturin',
  //   'Lacus',
  //   'Anter',
  //   'Erot',
  //   'Sem',
  //   'Nullam',
  //   'Ligula',
  //   'Bibenda',
  //   'Vestir',
  //   'Kinnier',
  //   'Capelen',
  //   'Magawen',
  //   'Clampe',
  //   'Raintos',
  //   'Yurdurshorin',
  //   'Dabel',
  //   'Charier',
  //   'Zamoro',
  //   'Torgur',
  //   'Otanison',
  //   'Dewber',
  //   'Peele',
  //   'Atteno',
  //   'Gymnopede',
  //   'Suncurop',
  //   'Sedge',
  //   'Moebius',
  //   'Laoreet',
  //   'Cosequa',
  //   'Dapidus',
  //   'Donece',
  //   'Blanditir',
  //   'Magna',
  //   'Baulk',
  //   'Flemmich',
  //   'Vischi',
  //   'Rubinsnow',
  //   'Montreip',
  //   'Essling',
  //   'Laiana',
  //   'Rubusmiche',
  //   'Hypearifas',
  //   'Elymus',
  //   'Neptunia',
  //   'Perstrata',
  //   'Castilleja',
  //   'Heckard',
  //   'Trifolis',
  //   'Subtarnahan',
  //   'Yannihern',
  //   'Zohary',
  //   'Ceanotip',
  //   'Camisso',
  //   'Fertifor',
  //   'Lamotium',
  //   'Nevadanse',
  //   'Coultro',
  //   'Paraiso',
  //   'Carex',
  //   'Trisperawam',
  //   'Charteris',
  //   'Riddlesden',
  //   'Curusu',
  //   'Loborisi',
  //   'Estviva',
  //   'Quissi',
  //   'Chartero',
  //   'Leschero',
  //   'Webeimper',
  //   'Kinlo',
  //   'Keplero',
  //   'Wando',
  //   'Habin',
  //   'Donarnahan',
  //   'Zuanish',
  //   'Elcoate',
  //   'Finnimor',
  //   'Palapalai',
  //   'Bluntleve',
  //   'Milgrimmia',
  //   'Galapine',
  //   'Mircobu',
  //   'Dittany',
  //   'Hackelia',
  //   'Douglassi',
  //   'Clusania'
  // ]
  // //creating a product for each island with a random price and random photo of 25 island photos in public folder
  // islandNames.forEach(async island => {
  //   let price =
  //     Math.floor(Math.random() * 100000000) + Math.floor(Math.random() * 100)
  //   let photoNum = Math.ceil(Math.random() * 25)
  //   await Product.create({
  //     category: 'island',
  //     name: island,
  //     imageUrl: `/islandPhotos/${photoNum}.jpeg`,
  //     price: price
  //   })
  // })

  //Creating 2 cart for now
  const orders = await Promise.all([
    Order.create({inProgress: false}),
    Order.create()
  ])
  //using the 'magic' addProducts method created by the many to many relationship
  let itemsInOrder1 = await orders[0].addProducts([products[0], products[1]])

  itemsInOrder1[0].price = products[0].price
  itemsInOrder1[1].price = products[1].price
  await itemsInOrder1[0].save()
  await itemsInOrder1[1].save()
  //using the 'magic' setUser method created by the one to one relationship between Cart and User
  await orders[0].setUser(users[0])
  orders[0].totalPrice = products[0].price + products[1].price
  await orders[0].save()

  //if this works like I think it should, now our user 'admin@email.com' will have one cart with 5 items in it
  //second order/cart
  // await orders[1].addProducts([products[3],[products[12], [products[1]])
  let itemsInOrder2 = await orders[1].addProducts([
    products[2],
    products[4],
    products[1]
  ])
  await orders[1].setUser(users[1])
  orders[1].totalPrice =
    products[2].price + products[4].price + products[1].price
  await orders[1].save()

  itemsInOrder2[0].price = products[2].price
  itemsInOrder2[1].price = products[4].price
  itemsInOrder2[2].price = products[1].price
  await itemsInOrder2[0].save()
  await itemsInOrder2[1].save()
  await itemsInOrder2[2].save()

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
