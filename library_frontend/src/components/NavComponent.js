import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchPanel from './SearchPanel';
import UserLogoComponent from './UserLogoComponent';
import booklogo from '../assets/images/booklogo.jpg';
import BeforeLogging from './BeforeLogging';
import goodreadslogo from '../assets/images/goodreadslogo.png';
import { UseAuth } from './Helpers/Auth';
const NavComponent = () => {
  const { user } = UseAuth();
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY < 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        className=" sticky-top nav-shadow "
        fixed="top"
        style={{
          transition: '1s ease',
          backgroundColor: navBackground ? 'transparent' : 'black',
        }}
      >
        <div className=" navbar text-center">
          <LinkContainer to="" className="mb-2">
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
            <Nav className="me-auto ">
              <LinkContainer to="" className="custom-nav-link">
                <Nav.Link className="h5">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="" className="custom-nav-link">
                <Nav.Link className="h5">Authors</Nav.Link>
              </LinkContainer>
              <LinkContainer to="" className="custom-nav-link">
                <Nav.Link className="h5">Categories</Nav.Link>
              </LinkContainer>
              <LinkContainer to="" className="custom-nav-link">
                <Nav.Link className="h5">Books</Nav.Link>
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
