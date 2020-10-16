import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'

export const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${userId}/orders`)
      // console.log(res.data)
      dispatch(setOrders(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS: {
      return action.orders
    }
    default:
      return state
  }
}
