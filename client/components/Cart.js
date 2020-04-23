import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'
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
      this.props.getCart(this.props.userId)
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
    cart: state.cart,
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
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
