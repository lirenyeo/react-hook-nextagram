import React, { useState, useContext, useReducer } from 'react'
import Axios from 'axios'
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthContext } from '../App'

const initialState = {
  email: '',
  username: '',
  password: ''
}

const reducer = (state, { field, value }) => ({
  ...state,
  [field]: value
})

const SignUpForm = ({ toggleModal, toggleForm }) => {
  const history = useHistory()

  const [state, dispatch] = useReducer(reducer, initialState)
  const { setCurrentUser } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [timer, setTimer] = useState(null)
  const [validUser, setValidUser] = useState(null)
  // null -- show no message
  // 'invalid' -- show username is invalid
  // 'valid' -- show username is valid

  const { username, email, password } = state

  const handleInput = ({ target: { name, value } }) => {
    // if typing in 'username' field
    if (name === 'username') {
      setValidUser(null) // to clear info message
      clearTimeout(timer) // reset timer

      const newTimer = setTimeout(() => {
        // make api call to check if username is valid
        Axios.get(
          `https://insta.nextacademy.com/api/v1/users/check_name?username=${value}`
        ).then(result => {
          setValidUser(result.data.valid ? 'valid' : 'invalid')
        })
      }, 500)
      setTimer(newTimer)
    }

    dispatch({
      field: name,
      value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    Axios.post('https://insta.nextacademy.com/api/v1/users/', {
      email,
      password,
      username
    })
      .then(res => {
        console.log(res)
        const { auth_token, user, message } = res.data
        setCurrentUser({
          jwt: auth_token,
          user
        })
        localStorage.setItem('jwt', auth_token) // store jwt
        localStorage.setItem('user', JSON.stringify(user)) //JSON.parse(localStorage.user) to get back the object
        setIsLoading(false) // remove loading indicator
        setHasError(false) // remove previous error message if any
        toast(message) // show popup message
        toggleModal() // close modal
        history.push(`/me`) // go to user profile page

      })
      .catch(err => {
        console.log(err.response)
        setHasError(true) // show error
        setIsLoading(false) // remove loading indicator
        err.response.data.message.forEach(msg => toast(msg))
      })
  }

  const displayHelperMessage = () => {
    if (validUser) {
      if (validUser === 'valid') {
        return <p className="text-success">Username is available!!</p>
      } else {
        return <p className="text-danger">Username has been taken!</p>
      }
    } else {
      return null
    }
  }
  return (
    <>
      <ModalHeader toggle={toggleModal}>Sign Up</ModalHeader>
      <ModalBody>
        {hasError && (
          <p className="text-danger text-center">
            Invalid credentials. Try again.
          </p>
        )}

        <Form id="login-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={handleInput}
            />
            {displayHelperMessage()}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleInput}
            />
          </FormGroup>
        </Form>
        <p style={{ fontSize: '0.9em' }}>
          Already a member?{' '}
          <a
            href="/"
            onClick={e => {
              e.preventDefault()
              toggleForm()
            }}
          >
            Log in here.
          </a>
        </p>
      </ModalBody>
      <ModalFooter>
        <input
          className="btn btn-info"
          type="submit"
          value={isLoading ? 'Signing Up...' : 'Sign Up'}
          form="login-form"
          disabled={isLoading}
        />
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  )
}

export default SignUpForm
