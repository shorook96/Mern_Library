import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from '../SideBar';

import AuthorsSlider from './AuthorsSlider';

const AllAuthors = () => {
  return (
    <>
      <Container>
        <AuthorsSlider />
      </Container>
    </>
  );
};

export default AllAuthors;
