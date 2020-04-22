import axios from 'axios'

const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

export const addProductToCart = (productId, userId = 0) => {
  return async dispatch => {
    try {
      const foundProduct = await axios.get(`/api/products/${productId}`)
      const cart = await axios.get(`/api/users/${userId}/cart`)
      if (!cart.data.id) {
        await axios.post(`/api/users/${userId}/cart`)
        dispatch(setCart([]))
      }

      await axios.put(`/api/users/${userId}/cart`, foundProduct.data)
      dispatch(addToCart(foundProduct.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCart = (userId = 0) => {
  return async dispatch => {
    try {
      if (userId === 0) {
        dispatch(setCart([]))
      } else {
        const res = await axios.get(`/api/users/${userId}/cart`)
        if (res.data.id) {
          console.log(res.data[0])
          dispatch(setCart(res.data[0].products))
        } else {
          dispatch(setCart([]))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// const initialState = {cart: [], product = {}}
const initialState = []

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      if (action.cart && action.cart.length > 0) {
        // let newPrice = action.cart.products.reduce((acc, cur) => {
        //   return acc + cur.price
        // }, 0)
        // console.log(newPrice)
        return action.cart
      } else return state
    }
    case ADD_TO_CART: {
      return [...state, action.product]
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
