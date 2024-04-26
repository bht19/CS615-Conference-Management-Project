import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../logo192.png';
import { Link, useLocation } from 'react-router-dom';

const NavbarInit = () => {
    const location = useLocation();

    return (
        <header>
            <Navbar expand="md" fixed="top" className="navbar">
                <Navbar.Brand href="/home">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </Navbar.Brand>
                <span className="navbar-heading">Conference Management System</span>
                <Navbar.Toggle aria-controls="main-navigation" />
                <Navbar.Collapse id="main-navigation">
                    <Nav className="ml-auto">
                        {location.pathname === '/reviewer' ? (
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/app3">View/Assign</Nav.Link>
                            </>
                        ) : (
                            <>
                                {location.pathname === '/app3' ? (
                                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                ) : (
                                    <Nav.Link as={Link} to="/app3">View/Assign</Nav.Link>
                                )}
                                <Nav.Link as={Link} to="/reviewer">Reviewers</Nav.Link>
                            </>
                        )}
                        <Nav.Link as={Link} to="/login">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default NavbarInit;
