import axios from 'axios'

const SET_PRODUCT = 'SET_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const setProduct = product => ({
  type: SET_PRODUCT,
  product
})

export const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

export const updateProduct = product => ({
  type: UPDATE_PRODUCT,
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

export const deleteProductThunk = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (error) {
      console.log('Error deleting product', error)
    }
  }
}

export const updateProductThunk = (id, product) => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${id}`, product)
      dispatch(updateProduct(product))
    } catch (error) {
      console.log('Error updating product', error)
    }
  }
}

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}
