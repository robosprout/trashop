import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Import Store Thunks

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <section className="boxes">
          {this.props.products.length > 0 ? (
            this.props.products.map(product => (
              <div key={product.name} className="box-wrapper">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <img src={product.imageUrl} />
              </div>
            ))
          ) : (
            <p>No Products to Display</p>
          )}
        </section>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: function() {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
