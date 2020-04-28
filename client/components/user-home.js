import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Cart} from './Cart'
import {fetchOrders} from '../store/orders'
import {me} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    // if (this.props.match.params.userId)
    //   this.props.getCart(this.props.match.params.userId)
    // req.session
    console.log(this.props)
    this.props.loadInitialData()
    this.props.getOrders(this.props.userId)
    console.log(this.props.orders)
  }

  render() {
    return (
      <div>
        <h2>Welcome, {this.props.email}</h2>
        <div className="order-history">
          <h2>Order History:</h2>
          {this.props.orders && this.props.orders.length > 0 ? (
            this.props.orders.map((order, i) => (
              <div key={order.id} className="outer-order-wrapper">
                <h3>{`Order ${i + 1}`}</h3>
                <div className="inner-order-wrapper">
                  {order.products.map(product => (
                    <div key={product.name} className="item-wrapper">
                      <img src={product.imageUrl} />
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <p>{`Price of item: $${(
                        product.itemsInOrder.price / 100
                      ).toFixed(2)}`}</p>
                      <p>{`Quantity: ${product.itemsInOrder.quantity}`}</p>
                    </div>
                  ))}
                  <h4>{`Total: $${(order.totalPrice / 100).toFixed(2)}`}</h4>
                </div>
              </div>
            ))
          ) : (
            <p>You haven't ordered anything yet</p>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    email: state.user.email,
    userId: state.user.id,
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: function(userId) {
      dispatch(fetchOrders(userId))
    },
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
