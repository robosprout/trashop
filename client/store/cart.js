import axios from 'axios'

const SET_CART = 'SET_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const fetchCart = (userId = 0) => {
  return async dispatch => {
    try {
      if (userId === 0) {
        dispatch(setCart([]))
      } else {
        const res = await axios.get(`/api/users/${userId}/cart`)
        console.log(res.data[0])
        dispatch(setCart(res.data[0]))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      if (action.cart.products && action.cart.products.length > 0) {
        // let newPrice = action.cart.products.reduce((acc, cur) => {
        //   return acc + cur.price
        // }, 0)
        // console.log(newPrice)
        return action.cart
      } else return state
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
