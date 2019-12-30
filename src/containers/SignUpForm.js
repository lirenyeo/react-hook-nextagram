import React, { useState, useReducer } from 'react'
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
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const { username, email, password } = state

  const handleInput = ({ target: { name, value } }) => {
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
      username,
    })
    .then(res => {
      console.log(res)
      setIsLoading(false)
      setHasError(false)
      toggleModal()
    })
    .catch(err => {
      console.log(err.response)
      setIsLoading(false)
      setHasError(true)
    })
  }

  return (
    <>
      <ModalHeader toggle={toggleModal}>Sign Up</ModalHeader>
      <ModalBody>
        { hasError && <p className='text-danger'>Invalid credentials. Try again.</p> }

        <Form id="login-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={handleInput}
            />
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
          <a href="#" onClick={toggleForm}>
            Log in here.
          </a>
        </p>
      </ModalBody>
      <ModalFooter>
        <input
          className="btn btn-primary"
          type="submit"
          value="Sign Up"
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
