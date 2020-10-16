import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import allUsersReducer from './allUsers'
import allProductsReducer from './products'
import singleProductReducer from './singleProduct'
import cartReducer from './cart'
import orderReducer from './orders'

const reducer = combineReducers({
  user: userReducer,
  users: allUsersReducer,
  products: allProductsReducer,
  product: singleProductReducer,
  basket: cartReducer,
  orders: orderReducer
})

const RESET_STORE = 'RESET_STORE'
export const resetStore = () => ({type: RESET_STORE})
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined
    return reducer(state, action)
  }
  return reducer(state, action)
}

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
    // ,createLogger({collapsed: true})
  )
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
