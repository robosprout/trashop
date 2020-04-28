import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact'
import {
  fetchCart,
  checkoutThunk,
  removeProduct,
  updateQuantityThunk
} from '../store/cart'
import {me} from '../store'
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
        <h2>Your Cart</h2>
        {this.props.cart && this.props.cart.length > 0 ? (
          this.props.cart.map(product => (
            <div key={product.name} className="cart-item-wrapper">
              <img src={product.imageUrl} />
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <button
                type="button"
                onClick={
                  this.props.isLoggedIn
                    ? () =>
                        this.props.removeFromCart(product.id, this.props.userId)
                    : () => this.props.removeFromCart(product.id)
                }
              >
                Remove Item
              </button>
              <div className="edit-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <select
                  name="item-quantity"
                  id="quantity"
                  value={
                    this.props.isLoggedIn
                      ? product.itemsInOrder.quantity
                      : product.quantity
                  }
                  onChange={
                    this.props.isLoggedIn
                      ? evt =>
                          this.props.updateQuantity(
                            product.id,
                            this.props.userId,
                            evt.target.value
                          )
                      : evt =>
                          this.props.updateQuantity(
                            product.id,
                            0,
                            evt.target.value
                          )
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
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

function removeFromGuestCart(productId) {
  const guestCart = JSON.parse(localStorage.getItem('guestCart'))
  delete guestCart[productId]
  localStorage.setItem('guestCart', JSON.stringify(guestCart))
  console.log('remove ----->', JSON.parse(localStorage.getItem('guestCart')))
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
    },
    updateQuantity: function(productId, userId = 0, quantity) {
      dispatch(updateQuantityThunk(productId, userId, quantity))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)

// selected={this.props.optionState==this.value}
// selected={product.itemsInOrder.quantity}
