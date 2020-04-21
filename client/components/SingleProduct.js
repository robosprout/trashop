import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Import Store Thunks

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    return (
      <div>
        <section className="singleProduct">
          <div className="singleProductLeftBox">
            <img src={`../${this.props.product.imageUrl}`} />
            <button type="button">Add to Cart</button>
          </div>
          <div className="singleProductRightBox">
            <h3>{this.props.product.name}</h3>
            <p>{this.props.product.desc}</p>
          </div>
        </section>
      </div>
    )
  }
}
