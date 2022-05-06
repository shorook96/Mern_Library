import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchPanel from './SearchPanel';
import UserLogoComponent from './UserLogoComponent';
const NavComponent = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="d-flex align-content-around">
          <LinkContainer to="">
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>Link</Nav.Link>
              </LinkContainer>
            </Nav>
            <SearchPanel />
            <UserLogoComponent />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavComponent;
