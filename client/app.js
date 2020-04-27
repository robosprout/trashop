import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
let cartList = {}
const App = () => {
  localStorage.setItem('guestCart', JSON.stringify(cartList))
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
