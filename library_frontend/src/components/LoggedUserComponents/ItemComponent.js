import React from 'react';
import { Button, Card } from 'react-bootstrap';
const ItemComponent = ({ data }) => {
  return (
    <>
      <Card style={{ width: '18rem' }} className="text-black">
        <Card.Img variant="top" src={data.id} />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{data.title}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ItemComponent;
