import React from 'react';
import { Navbar, NavbarBrand, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavbarLogo from './../assets/logo.svg';
import ButtonLogo from './../assets/logout.svg';
import { AuthContext } from '../contexts/AuthContext';
const NavbarMenu = () => {
    const {
        authState: { user },
        logoutUser,
    } = React.useContext(AuthContext);

    return (
        <>
            <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
                <img
                    src={NavbarLogo}
                    alt="SmartLearningLogo"
                    height="32"
                    width="32"
                    style={{ marginRight: 10 }}
                />
                <NavbarBrand>SmartLearning</NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link
                            className="font-weight-bolder text-white"
                            to="/dashboard"
                            as={Link}
                        >
                            DashBoard
                        </Nav.Link>
                        <Nav.Link
                            className="font-weight-bolder text-white"
                            to="/about"
                            as={Link}
                        >
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto" style={{ marginRight: 10 }}>
                        <Nav.Link
                            className="font-weight-bolder text-white"
                            disabled
                        >
                            {`Welcome ${user.username}`}
                        </Nav.Link>
                        <Button variant="secondary" onClick={logoutUser}>
                            <img
                                src={ButtonLogo}
                                alt="LogoutButton"
                                style={{ marginRight: 5 }}
                                width="32"
                                height="32"
                            />
                            Log out
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavbarMenu;
