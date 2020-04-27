import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'
import {me} from '../store'
import {addProductToCart} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor() {
    super()

    // this.clickHandler = this.clickHandler.bind(this);
  }
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
    this.props.loadInitialData()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <section className="singleProduct">
          <div className="singleProductLeftBox">
            <img src={this.props.product.imageUrl} />
            <button
              type="button"
              onClick={
                this.props.isLoggedIn
                  ? () =>
                      this.props.addToCart(
                        this.props.product.id,
                        this.props.userId
                      )
                  : () => this.props.addToCart(this.props.product.id, 0)
              }
            >
              Add to Cart
            </button>
          </div>
          <div className="singleProductRightBox">
            <h3>{this.props.product.name}</h3>
            <p>{this.props.product.description}</p>
          </div>
        </section>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product,
    userId: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: function(productId) {
      dispatch(fetchProduct(productId))
    },
    addToCart: function(productId, userId) {
      dispatch(addProductToCart(productId, userId))
    },
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
