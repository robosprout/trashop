import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import user from '../store/user'
import {fetchUsers} from '../store/allUsers'
import {me} from '../store'
// Import Store Thunks

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
    if (this.props.isAdmin) {
      this.props.getUsers(this.props.match.params.userId)
    }
    // this.props.getUsers(1)
  }

  render() {
    return (
      <div>
        <section className="boxes">
          {this.props.users.length > 0 ? (
            this.props.users.map(user => (
              <div key={user.email} className="box-wrapper">
                <Link to={`/products/${user.id}`}>{user.email}</Link>
                <img src={user.imageUrl} />
              </div>
            ))
          ) : (
            <p>No Users to Display</p>
          )}
        </section>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users,
    userId: state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: function(userId) {
      dispatch(fetchUsers(userId))
    },
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
