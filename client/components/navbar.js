import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId, numOfItems}) => {
  return (
    <div>
      <nav>
        <div id="nav-bar-cont">
          <div id="nav-bar-cont-left">
            <Link to="/">
              <h2>TraShop</h2>
            </Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <p id="cart-num">{numOfItems}</p>
          </div>
          {isLoggedIn ? (
            <div id="user-auth-cont">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              {isAdmin && (
                <Link to={`/users/${userId}/allUsers`}>All Users</Link>
              )}
            </div>
          ) : (
            <div id="user-auth-cont">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
      {/* <hr /> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    userId: state.user.id,
    numOfItems: state.basket.cart.length
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
