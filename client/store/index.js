import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import allProductsReducer from './products'
import singleProductReducer from './singleProduct'
import cartReducer from './cart'

const reducer = combineReducers({
  user: userReducer,
  products: allProductsReducer,
  product: singleProductReducer,
  basket: cartReducer
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
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
