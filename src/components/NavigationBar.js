import React from 'react';
import { Navbar, Container, NavbarToggler, Collapse, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Spectre's Personal Blog
          </Link>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto d-felx justify-content-around" navbar>
              {false ? (
                <h1 className="text-white">(authLink)</h1>
              ) : (
                <h1 className="text-white">(guestLink)</h1>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
