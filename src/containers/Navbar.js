import React, { useState } from 'react'
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

const MyNav = () => {
  const [isOpen, setIsOpen] = useState(false)

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
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default MyNav
