import React, { useReducer } from 'react'

const initialState = {
  username: ''
}

const reducer = (state, {type, username }) => {
  switch (type) {
    case 'login':
      return { username }
    case 'logout':
      return { username: '' }
    default:
      throw new Error()
  }
}

const useCurrentUser = () => {
  return useReducer(reducer, initialState)
}

export default useCurrentUser