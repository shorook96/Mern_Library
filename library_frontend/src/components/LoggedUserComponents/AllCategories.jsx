import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from '../SideBar';

import CategoriesSlider from './CategoriesSlider';

const AllCategories = () => {
  return (
    <>
      {/* <SideBar /> */}
      <Container>
        <CategoriesSlider />
      </Container>
    </>
  );
};

export default AllCategories;
