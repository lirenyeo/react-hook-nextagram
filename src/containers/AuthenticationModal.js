import React, { useState, useContext } from 'react'
import { Modal } from 'reactstrap'

import LoginForm from './LogInForm'
import SignUpForm from './SignUpForm'
import { AuthContext } from '../App'

const AuthenticationModal = props => {
  const [modal, setModal] = useState(false)
  const [showLogin, setshowLogin] = useState(true)

  const { currentUser } = useContext(AuthContext)

  const toggleForm = () => setshowLogin(!showLogin)

  const toggleModal = () => setModal(!modal)

  return (
    <>
      {!currentUser.jwt && (
        <a
          href="/"
          className="nav-link"
          onClick={e => {
            e.preventDefault()
            toggleModal()
          }}
        >
          Login
        </a>
      )}
      <Modal isOpen={modal} toggle={toggleModal}>
        {showLogin ? (
          <LoginForm toggleModal={toggleModal} toggleForm={toggleForm} />
        ) : (
          <SignUpForm toggleModal={toggleModal} toggleForm={toggleForm} />
        )}
      </Modal>
    </>
  )
}

export default AuthenticationModal
