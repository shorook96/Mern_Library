import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from '../SideBar';
import BooksSlider from './BooksSlider';

const UserHome = () => {
  return (
    <>
      <div className="d-flex">
        <SideBar />
        <Container>
          <BooksSlider />
        </Container>
      </div>
    </>
  );
};

export default UserHome;
