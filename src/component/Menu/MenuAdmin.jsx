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
import { AuthContext } from '../../App';

export default function MenuAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { dispatch } = useContext(AuthContext)

    return (
        <div>
            <Navbar className="navbar-dark bg-dark" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/dashboard" className="nav-link">HOME</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/transaksi" className="nav-link">TRANSAKSI</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/news" className="nav-link">NEWS</NavLink>
                        </NavItem>

                    </Nav>
                    <NavbarText>
                        <Button color="success" onClick={() => {
                            dispatch({
                                type: "LOGOUT"
                            })

                            return <Redirect to="/login" />
                        }

                        }>
                            LOGOUT
                        </Button>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}
