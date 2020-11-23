import React, { useContext, useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button
  } from 'reactstrap';
import { AuthContext } from '../App';


export default function MenuComp() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const {state, dispatch} = useContext(AuthContext)

    return (
        <div>
        <Navbar className="navbar-dark bg-dark" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              
            </Nav>
            <NavbarText>
              <Button color="default" onClick={()=>
                dispatch({
                  type: "LOGOUT"
                })
              }>
                {state.isAuthenticated && (
                  <NavLink>LOGOUT</NavLink>
                )}
              </Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
}
