import React from 'react';
import { Card } from 'react-bootstrap';

const CategoryItemComponent = ({ data }) => {
  return (
    <>
      <Card
        bg={'white'}
        key={'primary'}
        text={'dark'}
        style={{ width: '18rem' }}
        className="mt-5 rounded "
      >
        <Card.Body>
          <Card.Title> {data.categoryName} </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default CategoryItemComponent;
