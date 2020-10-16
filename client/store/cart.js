/* eslint-disable max-statements */
/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'
import {removeFromGuestCart, updateQuantityGuestCart} from './guestHelper'

const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CHECKOUT = 'CHECKOUT'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

export const setCart = (cart, price) => ({
  type: SET_CART,
  cart,
  price
})

export const addToCart = (product, loggedIn) => ({
  type: ADD_TO_CART,
  product,
  loggedIn
})

export const removeFromCart = (productId, quantity, loggedIn) => ({
  type: REMOVE_FROM_CART,
  productId,
  quantity,
  loggedIn
})

export const checkout = () => ({
  type: CHECKOUT
})

export const updateQuantity = (productId, quantity, loggedIn) => ({
  type: UPDATE_QUANTITY,
  productId,
  quantity,
  loggedIn
})
// {guestCart: JSON.parse(localStorage.getItem('guestCart'))}
export const guestCartToOrder = (method, userId) => {
  return async dispatch => {
    try {
      let res
      if (method === 'signup') {
        res = await axios.post(`/api/users/${userId}/newGuestCart`, {
          guestCart: JSON.parse(localStorage.getItem('guestCart'))
        })
      } else {
        res = await axios.post(`/api/users/${userId}/loggedInCart`, {
          guestCart: JSON.parse(localStorage.getItem('guestCart'))
        })
      }
      localStorage.clear()
      localStorage.setItem('guestCart', JSON.stringify({}))
      // const res = await axios.get(`/api/users/${userId}/cart`)
      if (res.data && res.data.id) {
        // console.log(res.data)
        dispatch(setCart(res.data.products, res.data.totalPrice))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export const addProductToCart = (productId, userId = 0) => {
  return async dispatch => {
    try {
      if (userId !== 0) {
        const newProduct = await axios.put(`/api/users/${userId}/cart`, {
          productId: productId
        })
        dispatch(addToCart(newProduct.data, true))
      }
      // else {
      //   const newProduct = await axios.get(`/api/products/${productId}`)
      //   dispatch(addToCart(newProduct.data, false))
      // }
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateQuantityThunk = (productId, userId = 0, quantity) => {
  return async dispatch => {
    try {
      if (userId !== 0) {
        await axios.put(`/api/users/${userId}/cart-update`, {
          productId: productId,
          quantity: quantity
        })

        dispatch(updateQuantity(productId, quantity, true))
      } else {
        updateQuantityGuestCart(productId, quantity)
        dispatch(updateQuantity(productId, quantity, false))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProduct = (productId, userId = 0, quantity) => {
  return async dispatch => {
    try {
      if (userId !== 0) {
        await axios.put(`/api/users/${userId}/cart-remove`, {
          productId: productId,
          quantity: quantity
        })
        dispatch(removeFromCart(productId, quantity, true))
      } else {
        const foundProductFromGuestCart = removeFromGuestCart(productId)
        dispatch(removeFromCart(productId, quantity, false))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCart = (userId = 0) => {
  return async dispatch => {
    try {
      //logged in user
      if (userId !== 0) {
        const res = await axios.get(`/api/users/${userId}/cart`)
        if (res.data && res.data.id) {
          // console.log(res.data)
          dispatch(setCart(res.data.products, res.data.totalPrice))
        }
      } else {
        //guest user
        //turn localStorage(object) into array
        const guestCart = JSON.parse(localStorage.getItem('guestCart'))
        let guestCartArray = []
        let totalPrice = 0
        // eslint-disable-next-line guard-for-in
        for (let key in guestCart) {
          guestCartArray.push(guestCart[key])
          totalPrice += guestCart[key].price * guestCart[key].quantity
        }
        // console.log(guestCartArray, totalPrice)
        dispatch(setCart(guestCartArray, totalPrice))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutThunk = (userId = 0, cartId = 0) => {
  return async dispatch => {
    try {
      if (userId !== 0) {
        await axios.put(`/api/users/${userId}/checkout`)
      }
      dispatch(checkout())
      history.push('/checkout')
      localStorage.clear()
      localStorage.setItem('guestCart', JSON.stringify({}))
    } catch (error) {
      console.log(error)
    }
  }
}
// const initialState = {cart: [], product = {}}
const initialState = {cart: [], price: 0}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      if (action.cart) {
        return {...state, cart: action.cart, price: action.price}
      } else return state
    }
    case ADD_TO_CART: {
      const newPrice = state.price + action.product.price
      let newProduct = true
      state.cart.forEach(product => {
        if (product.id === action.product.id) newProduct = false
      })
      if (newProduct) {
        // console.log('adding product')
        if (action.loggedIn) {
          return {
            ...state,
            cart: [...state.cart, action.product],
            price: newPrice
          }
        } else {
          action.product.itemsInOrder = {}
          action.product.itemsInOrder.quantity = 1
          return {
            ...state,
            cart: [...state.cart, action.product],
            price: newPrice
          }
        }
      } else {
        // console.log('updating quant')
        let thruCheck = true
        const newCart = state.cart.map(product => {
          if (product.id === action.product.id) {
            thruCheck = !!product.itemsInOrder
            if (thruCheck)
              product.itemsInOrder.quantity = product.itemsInOrder.quantity + 1
            else {
              product.itemsInOrder = {}
              product.itemsInOrder.quantity = 2
            }
          }
          return product
        })
        return {...state, cart: newCart, price: newPrice}
      }
    }
    case REMOVE_FROM_CART: {
      let removedProduct
      state.cart.forEach(product => {
        if (product.id === action.productId) removedProduct = product
      })
      // console.log(removedProduct)
      const newPrice = state.price - removedProduct.price * action.quantity
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.productId),
        price: newPrice
      }
      // return state.filter(product => product.id !== action.product.id);
    }
    case CHECKOUT: {
      return initialState
    }
    case UPDATE_QUANTITY: {
      let change
      let price
      let newCart = []
      if (action.loggedIn) {
        newCart = state.cart.map(product => {
          if (product.id === action.productId) {
            change = action.quantity - product.itemsInOrder.quantity
            price = product.price
            product.itemsInOrder.quantity = action.quantity
          }
          return product
        })
      } else {
        newCart = state.cart.map(product => {
          if (product.id === action.productId) {
            change = action.quantity - product.quantity
            price = product.price
            product.quantity = action.quantity
          }
          return product
        })
      }

      // console.log(newCart)
      const newPrice = state.price + price * change

      return {...state, cart: newCart, price: newPrice}
    }
    default:
      return state
  }
}

//class methods/hooks
// Cart.afterUpdate(async (cartInstance) => {
//   //if there is at least 1 item in the items array
//   if (cartInstance.items[0]) {
//     //use 'reduce' array method to calculate the total price of items in our items array
//     return cartInstance.items.reduce((acc, cur) => {
//       return acc + cur.price
//     }, 0.00)
//   } else {
//     return 0.00
//   }
// })
