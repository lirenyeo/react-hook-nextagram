import React, { useState } from 'react'
import { Modal } from 'reactstrap'

import LoginForm from './LogInForm'
import SignUpForm from './SignUpForm'

const AuthenticationModal = props => {
  const [modal, setModal] = useState(false)
  const [showLogin, setshowLogin] = useState(true)

  const toggleForm = () => setshowLogin(!showLogin)

  const toggleModal = () => setModal(!modal)

  const logout = () => alert('logged out')

  return (
    <div>
      {localStorage.jwt ? (
        <a href="#" className="nav-link" onClick={logout}>
          Log Out
        </a>
      ) : (
        <a href="#" className="nav-link" onClick={toggleModal}>
          Login
        </a>
      )}
      <Modal isOpen={modal} toggleModal={toggleModal}>
        {showLogin ? (
          <LoginForm toggleModal={toggleModal} toggleForm={toggleForm} />
        ) : (
          <SignUpForm toggleModal={toggleModal} toggleForm={toggleForm} />
        )}
      </Modal>
    </div>
  )
}

export default AuthenticationModal
