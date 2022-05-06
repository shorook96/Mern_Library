import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchPanel from './SearchPanel';
import UserLogoComponent from './UserLogoComponent';
import booklogo from '../assets/images/booklogo.jpg';

const NavComponent = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="d-flex  align-content-around">
          <LinkContainer to="">
            <Navbar.Brand>
              <Image
                width={70}
                height={40}
                roundedCircle
                className="App-logo "
                src={booklogo}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>Authors</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>Categories</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>Books</Nav.Link>
              </LinkContainer>
            </Nav>
            <Container>
              <SearchPanel />
            </Container>
          </Navbar.Collapse>
          <UserLogoComponent />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
};

export default NavComponent;
