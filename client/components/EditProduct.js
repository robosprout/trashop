import React from 'react'
import {Link} from 'react-router-dom'

export default class EditProduct extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   category: this.props.category,
    //   name: this.props.name,
    //   imageUrl: this.props.imageUrl,
    //   description: this.props.description,
    //   price: this.props.price
    // }
    this.state = {
      category: '',
      name: '',
      imageUrl: '',
      description: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // componentDidMount() {
  //   this.setState({
  //     category: this.props.category,
  //     name: this.props.name,
  //     imageUrl: this.props.imageUrl,
  //     description: this.props.description,
  //     price: this.props.price
  //   })
  //   console.log('props in compdidmount', this.props)
  // }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('handlechangestate', this.state)
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.update(this.props.id, this.state)
    this.setState({
      category: '',
      name: '',
      imageUrl: '',
      description: '',
      price: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label>Category:
          <textarea value={this.state.category} onChange={this.handleChange} />
        </label>
        <label>Name:
          <textarea value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>Image Url:
          <textarea value={this.state.imageUrl} onChange={this.handleChange} />
        </label>
        <label>Description:
          <textarea value={this.state.description} onChange={this.handleChange} />
        </label>
        <label>Price:
          <textarea value={this.state.price} onChange={this.handleChange} />
        </label> */}
        <label htmlFor="category">Category</label>
        <input
          name="category"
          type="text"
          value={this.state.category}
          onChange={this.handleChange}
        />
        <label htmlFor="name">Product Name:</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="imageUrl">Image Url</label>
        <input
          name="imageUrl"
          type="text"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          name="price"
          type="text"
          value={this.props.price}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    )
  }
}
