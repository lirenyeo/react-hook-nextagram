/**
 * When used like this,
 *    <LoginCheck>
 *      <MyPage />
 *    </LoginCheck>
 * This component will render <MyPage /> is user is logged in
 * by checking 'currentUser.jwt'
 * Or else, it will redirect to Homepage with warning message
 */

import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../App'

const LoginCheck = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  let history = useHistory()

  if (!currentUser.jwt) {
    history.push('/')
    toast('Please log in first!')
    return null
  } else {
    return <>{children}</>
  }
}

export default LoginCheck
