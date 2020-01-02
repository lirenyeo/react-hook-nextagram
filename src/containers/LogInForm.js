import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
import { toast } from 'react-toastify'

import { AuthContext } from '../App'

const LoginForm = ({ toggleModal, toggleForm }) => {
  let history = useHistory()
  const { setCurrentUser } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [loginInfo, setLoginInfo] = useState({
    username: 'liren',
    password: 'qweqwe123123'
  })

  const { username, password } = loginInfo

  const handleInput = e => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = e => {
    e.preventDefault()
    setLoading(true)
    Axios.post('https://insta.nextacademy.com/api/v1/login', {
      username: username,
      password: password
    })
      .then(result => {
        console.log(result.data)
        const { auth_token, message, status, user } = result.data
        if (status === 'success') {
          // setCurrentUser comes App.js through useContext
          setCurrentUser({
            jwt: auth_token,
            user
          })
          localStorage.setItem('jwt', auth_token) // store jwt
          localStorage.setItem('user', JSON.stringify(user)) //JSON.parse(localStorage.user) to get back the object
          toggleModal()
          toast('You are logged in!')
          history.push(`/me`)
          setLoading(false)
        }
      })
      .catch(err => {
        console.error(err)
        if (err.response && err.response.data.status === 'fail') {
          toast('Invalid login credentials')
        } else {
          toast(
            'Something went wrong. Please try again later, or contact our customer service.'
          )
        }
        setLoading(false)
      })
  }
  return (
    <>
      <ModalHeader toggle={toggleModal}>Login</ModalHeader>
      <ModalBody>
        <Form id="login-form" onSubmit={handleLogin}>
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
          New member?{' '}
          <a
            href="/"
            onClick={e => {
              e.preventDefault()
              toggleForm()
            }}
          >
            Sign up here.
          </a>
        </p>
      </ModalBody>
      <ModalFooter>
        <input
          className="btn btn-info"
          type="submit"
          value={loading ? 'Logging In...' : 'Log In'}
          form="login-form"
          disabled={loading}
        />
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  )
}

export default LoginForm
