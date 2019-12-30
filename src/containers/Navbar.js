import React, { useState, useContext } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { Link } from 'react-router-dom'

import AuthenticationModal from './AuthenticationModal'
import useCurrentUser from '../ducks/CurrentUser'

const MyNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, dispatch] = useCurrentUser()

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div id="nav">
      <Navbar color="transparent" light expand="md">
        <NavbarBrand tag={Link} to="/" href="/">
          <img
            height="35"
            width="47"
            src="https://cdn.dribbble.com/users/41636/screenshots/2719580/instagram-logo-concept.jpg"
            alt=""
          />
          Reactagram
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <AuthenticationModal />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default MyNav
