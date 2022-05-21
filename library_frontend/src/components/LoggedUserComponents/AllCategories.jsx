import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from '../SideBar';

import CategoriesSlider from './CategoriesSlider';

const AllCategories = () => {
  return (
    <>
      <div className="d-flex">
        {/* <SideBar /> */}
        <Container>
          <CategoriesSlider />
        </Container>
      </div>
    </>
  );
};

export default AllCategories;
