import React, { useContext, useState } from 'react'
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

const LoginForm = ({ toggleModal, toggleForm }) => {
  const handleLogin = e => {
    e.preventDefault()
  }
  return (
    <>
      <ModalHeader toggle={toggleModal}>Login</ModalHeader>
      <ModalBody>
        {/* errorMessage && <p className="text-danger">{errorMessage}</p> */}
        <Form id="login-form" onSubmit={handleLogin}>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" />
          </FormGroup>
        </Form>
        <p style={{ fontSize: '0.9em' }}>
          New member?{' '}
          <a href="#" onClick={toggleForm}>
            Sign up here.
          </a>
        </p>
      </ModalBody>
      <ModalFooter>
        <input className="btn btn-primary" type="submit" form="login-form" />
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  )
}

export default LoginForm
