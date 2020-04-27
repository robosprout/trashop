'use strict'
const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
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
  //15 items in products array, first 10 are 'trash', then 5 'car'
  const products = await Promise.all([
    //10 trash products
    Product.create({
      category: 'trash',
      name: 'sponge',
      description: 'an old sponge',
      price: 9999
    }),
    Product.create({
      category: 'trash',
      name: 'beercan',
      description: 'old crusty beer',
      price: 1700
    }),
    Product.create({
      category: 'trash',
      name: 'used lollipops',
      description: 'a beautiful collection of slightly used lollipops',
      price: 895
    }),
    Product.create({
      category: 'trash',
      name: 'oatmeal',
      description: 'a bowl of rotting oatmeal',
      price: 501
    }),
    Product.create({
      category: 'trash',
      name: 'lightbulb',
      description: 'a burnt out lightbulb',
      price: 4575
    }),
    Product.create({
      category: 'trash',
      name: 'coffee grounds',
      description: 'use coffee grounds',
      price: 5999
    }),
    Product.create({
      category: 'trash',
      name: 'paintbrush',
      description: 'old crusty paintbrush',
      price: 2500
    }),
    Product.create({
      category: 'trash',
      name: 'calendar',
      description: '2008 calendar (slightly crusty)',
      price: 707
    }),
    Product.create({
      category: 'trash',
      name: 'broken cup',
      description: 'classy cup with a hole in the bottom',
      price: 330
    }),
    Product.create({
      category: 'trash',
      name: 'empty box',
      description: 'empty cardboard box (mildly crusty)',
      price: 800
    }),
    //5 car products
    Product.create({
      category: 'car',
      name: 'ferrari',
      description: 'a fancy car',
      price: 3000000
    }),
    Product.create({
      category: 'car',
      name: 'dolorean2',
      description: 'a car from the future',
      price: 5000000
    }),
    Product.create({
      category: 'car',
      name: '96 subaru',
      description: 'a classic car',
      price: 10000000
    }),
    Product.create({
      category: 'car',
      name: 'lamborgini',
      description: 'a race car',
      price: 50000000
    }),
    Product.create({
      category: 'car',
      name: 'model t',
      description: 'an old car',
      price: 50000000
    })
  ])
  //uncomment lines below for islands
  // //100 island names
  const islandNames = [
    'Lacinia',
    'Amet',
    'Neque',
    'Sit',
    'Platea',
    'Aenean',
    'Bornst',
    'Proin',
    'Maecenas',
    'Nisi',
    'Facilisi',
    'Orci',
    'Coragorsha',
    'Aliquet',
    'Forturin',
    'Lacus',
    'Anter',
    'Erot',
    'Sem',
    'Nullam',
    'Ligula',
    'Bibenda',
    'Vestir',
    'Kinnier',
    'Capelen',
    'Magawen',
    'Clampe',
    'Raintos',
    'Yurdurshorin',
    'Dabel',
    'Charier',
    'Zamoro',
    'Torgur',
    'Otanison',
    'Dewber',
    'Peele',
    'Atteno',
    'Gymnopede',
    'Suncurop',
    'Sedge',
    'Moebius',
    'Laoreet',
    'Cosequa',
    'Dapidus',
    'Donece',
    'Blanditir',
    'Magna',
    'Baulk',
    'Flemmich',
    'Vischi',
    'Rubinsnow',
    'Montreip',
    'Essling',
    'Laiana',
    'Rubusmiche',
    'Hypearifas',
    'Elymus',
    'Neptunia',
    'Perstrata',
    'Castilleja',
    'Heckard',
    'Trifolis',
    'Subtarnahan',
    'Yannihern',
    'Zohary',
    'Ceanotip',
    'Camisso',
    'Fertifor',
    'Lamotium',
    'Nevadanse',
    'Coultro',
    'Paraiso',
    'Carex',
    'Trisperawam',
    'Charteris',
    'Riddlesden',
    'Curusu',
    'Loborisi',
    'Estviva',
    'Quissi',
    'Chartero',
    'Leschero',
    'Webeimper',
    'Kinlo',
    'Keplero',
    'Wando',
    'Habin',
    'Donarnahan',
    'Zuanish',
    'Elcoate',
    'Finnimor',
    'Palapalai',
    'Bluntleve',
    'Milgrimmia',
    'Galapine',
    'Mircobu',
    'Dittany',
    'Hackelia',
    'Douglassi',
    'Clusania'
  ]
  //creating a product for each island with a random price and random photo of 25 island photos in public folder
  islandNames.forEach(async island => {
    let price =
      Math.floor(Math.random() * 100000000) + Math.floor(Math.random() * 100)
    let photoNum = Math.ceil(Math.random() * 25)
    await Product.create({
      category: 'island',
      name: island,
      imageUrl: `/islandPhotos/${photoNum}.jpeg`,
      price: price
    })
  })
  //Creating 2 cart for now
  const orders = await Promise.all([
    Order.create({inProgress: false}),
    Order.create()
  ])
  //using the 'magic' addProducts method created by the many to many relationship
  await orders[0].addProducts([
    products[0],
    products[1],
    products[2],
    products[8]
  ])
  //using the 'magic' setUser method created by the one to one relationship between Cart and User
  await orders[0].setUser(users[0])
  orders[0].totalPrice =
    products[0].price +
    products[1].price +
    products[2].price +
    products[8].price
  await orders[0].save()
  //if this works like I think it should, now our user 'admin@email.com' will have one cart with 5 items in it
  //second order/cart
  // await orders[1].addProducts([products[3],[products[12], [products[1]])
  await orders[1].addProducts([products[2], products[4], products[1]])
  await orders[1].setUser(users[1])
  orders[1].totalPrice =
    products[2].price + products[4].price + products[1].price
  await orders[1].save()
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
