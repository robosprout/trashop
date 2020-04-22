import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <section className="singleProduct">
          <div className="singleProductLeftBox">
            <img src={this.props.product.imageUrl} />
            <button type="button">Add to Cart</button>
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
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: function(productId) {
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
