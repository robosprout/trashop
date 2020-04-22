import axios from 'axios'

const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

export const setProducts = products => ({
  type: SET_ALL_PRODUCTS,
  products
})

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products')
      dispatch(setProducts(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
