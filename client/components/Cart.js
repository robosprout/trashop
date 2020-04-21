import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'
// Import Store Thunks

export class Cart extends React.Component {
  componentDidMount() {
    if (this.props.match.params.userId)
      this.props.getCart(this.props.match.params.userId)
  }

  render() {
    return (
      <div className="cart">
        {this.props.cart && this.props.cart.products.length > 0 ? (
          this.props.cart.products.map(product => (
            <div key={product.name} className="box-wrapper">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <img src={product.imageUrl} />
            </div>
          ))
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: function(userId) {
      dispatch(fetchCart(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
