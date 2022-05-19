import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from '../SideBar';

import AuthorsSlider from './AuthorsSlider';

const AllAuthors = () => {
  return (
    <>
      <div className="d-flex">
        {/* <SideBar /> */}
        <Container>
          <AuthorsSlider />
        </Container>
      </div>
    </>
  );
};

export default AllAuthors;
