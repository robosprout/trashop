import axios from 'axios'

const SET_PRODUCT = 'SET_PRODUCT'

export const setProduct = product => ({
  type: SET_PRODUCT,
  product
})

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      console.log(res.data)
      dispatch(setProduct(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
