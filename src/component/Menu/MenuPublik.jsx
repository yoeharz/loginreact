import React, { useContext, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Button
} from 'reactstrap';

export default function MenuPublik() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar className="navbar-dark bg-dark" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>

                        </NavItem>

                    </Nav>
                    <NavbarText>
                        <NavLink to="/login">LOGIN</NavLink>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}
