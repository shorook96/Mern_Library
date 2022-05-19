import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import BooksSlider from './BooksSlider';

const UserHome = () => {
  return (
    <>
      <div className="d-flex">
        
        <Container>
          <BooksSlider />
        </Container>
      </div>
    </>
  );
};

export default UserHome;
