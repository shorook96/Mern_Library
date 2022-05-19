import React from 'react';
import { Button, Card } from 'react-bootstrap';
const ItemComponent = ({ data }) => {
  return (
    <>
      <Card style={{ width: '18rem' }} className="text-black">
        <Card.Img variant="top" src={data.photo} />
        <Card.Body>
          <Card.Title>{data.bookName}</Card.Title>
          <Card.Text>{data.bookName}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ItemComponent;
