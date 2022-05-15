import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchPanel from './SearchPanel';
import UserLogoComponent from './UserLogoComponent';
import booklogo from '../assets/images/booklogo.jpg';
import BeforeLogging from './BeforeLogging';
import goodreadslogo from '../assets/images/goodreadslogo.png';
import { UseAuth } from './Helpers/Auth';

let loggedIn = false;
const NavComponent = () => {
  const { user } = UseAuth();

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className=" sticky-top nav-shadow  "
      >
        <div className="d-flex align-content-around navbar text-center">
          <LinkContainer to="">
            <Navbar.Brand>
              <Image
                width={70}
                height={40}
                className="App-logo "
                roundedCircle
                src={booklogo}
              />
              <Image
                width={100}
                height={20}
                className="m-2"
                src={goodreadslogo}
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
            {user ? (
              <Container>
                <SearchPanel />
              </Container>
            ) : null}
          </Navbar.Collapse>
          {user ? <UserLogoComponent /> : <BeforeLogging />}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
      </Navbar>
    </>
  );
};

export default NavComponent;
