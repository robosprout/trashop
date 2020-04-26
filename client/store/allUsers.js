import axios from 'axios'

const SET_ALL_USERS = 'SET_ALL_USERS'

export const setUsers = users => ({
  type: SET_ALL_USERS,
  users
})

export const fetchUsers = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${userId}/allusers`)
      console.log('THIS IS RES.DATA IN FETCHUSERS>>>', res.data)
      // if (res.data[0]){
      dispatch(setUsers(res.data))
      // } else {
      // dispatch(setUsers([]))
      // }
    } catch (error) {
      console.log(error)
    }
  }
}

export default function allUsersReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
