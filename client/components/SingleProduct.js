import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchProduct,
  deleteProductThunk,
  updateProductThunk
} from '../store/singleProduct'
import {me} from '../store'
import EditProduct from './EditProduct'
import {addProductToCart} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.displayEditForm = this.displayEditForm.bind(this)
    this.state = {
      displayEdit: false
    }
  }
  componentDidMount() {
    this.props.loadInitialData()
    this.props.getProduct(this.props.match.params.productId)
  }
  displayEditForm() {
    let currentBool = this.state.displayEdit
    this.setState({displayEdit: !currentBool})
  }
  render() {
    const {isAdmin, userId} = this.props
    let editForm = null
    if (this.state.displayEdit) {
      editForm = (
        <EditProduct
          update={this.props.updateProduct}
          product={this.props.product}
          id={this.props.product.id}
        />
      )
    }
    return (
      <div className="singleProduct-cont">
        {this.props.product ? (
          <section className="singleProduct">
            <div className="singleProductLeftBox">
              <img src={this.props.product.imageUrl} />
              <button
                type="button"
                onClick={() =>
                  this.props.addToCart(this.props.product.id, userId)
                }
              >
                Add to Cart
              </button>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() =>
                    this.props.deleteProduct(this.props.product.id, userId)
                  }
                >
                  Remove Item
                </button>
              )}
              {isAdmin && (
                <button type="button" onClick={() => this.displayEditForm()}>
                  Edit Item
                </button>
              )}
              {editForm}
              {/* {isAdmin && (
                <EditProduct
                  update={this.props.updateProduct}
                  product={this.props.product}
                  id={this.props.product.id}
                />
              )} */}
            </div>
            <div className="singleProductRightBox">
              <h3>{this.props.product.name}</h3>
              <p>{this.props.product.description}</p>
              <p>{this.props.product.price}</p>
            </div>
          </section>
        ) : (
          <p>Can't find that product - Check back later</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product,
    displayEdit: false,
    userId: state.user.id,
    isAdmin: state.user.isAdmin
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
    deleteProduct: function(productId) {
      dispatch(deleteProductThunk(productId))
      dispatch(fetchProduct(productId))
    },
    updateProduct: function(id, product) {
      dispatch(updateProductThunk(id, product))
      dispatch(fetchProduct(id))
    },
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
