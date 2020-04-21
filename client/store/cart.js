import axios from 'axios'

const SET_CART = 'SET_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const fetchCart = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${userId}/cart`)
      dispatch(setCart(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  cart: [],
  totalPrice: 0
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      let newPrice = action.cart.products.reduce((acc, cur) => {
        return acc + cur.price
      }, 0)
      console.log(newPrice)
      return {...state, cart: action.cart, totalPrice: newPrice}
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
