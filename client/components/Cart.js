import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, checkoutThunk} from '../store/cart'
import {me} from '../store'
import {removeProduct} from '../store/cart'
// Import Store Thunks

export class Cart extends React.Component {
  componentDidMount() {
    // if (this.props.match.params.userId)
    //   this.props.getCart(this.props.match.params.userId)
    // req.session
    console.log(this.props)
    this.props.loadInitialData()
    if (this.props.isLoggedIn) {
      console.log('YOURE LOGGED IN')
    } else {
      this.props.getCart()
    }
  }

  render() {
    return (
      <div className="cart">
        {this.props.cart && this.props.cart.length > 0 ? (
          this.props.cart.map(product => (
            <div key={product.name} className="box-wrapper">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <img src={product.imageUrl} />
              <button
                type="button"
                onClick={() =>
                  this.props.removeFromCart(product.id, this.props.userId)
                }
              >
                Remove Item
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty!</p>
        )}
        {this.props.cart && this.props.cart.length > 0 ? (
          <div className="checkout">
            <h3>Total: {this.props.price}</h3>
            <button
              type="button"
              onClick={() => this.props.checkout(this.props.userId)}
            >
              Checkout
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.basket.cart,
    price: state.basket.price,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: function(userId = 0) {
      console.log(userId)
      dispatch(fetchCart(userId))
    },
    removeFromCart: function(productId, userId = 0) {
      dispatch(removeProduct(productId, userId))
    },
    loadInitialData() {
      dispatch(me())
    },
    checkout: function(id) {
      dispatch(checkoutThunk(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
