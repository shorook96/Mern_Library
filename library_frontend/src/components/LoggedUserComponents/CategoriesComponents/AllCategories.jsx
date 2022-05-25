import React from 'react';
import { Container } from 'react-bootstrap';

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
