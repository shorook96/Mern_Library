import React from 'react';
import { Button, Card } from 'react-bootstrap';


const AuthorItemComponent = ({ data }) => {
  return (
    <>
      <Card style={{ width: '18rem' }} className="text-black">
        <Card.Img variant="top" src={data.photo} />
        <Card.Body>
          <Card.Title>{data.firstname}</Card.Title>
          <Card.Text>{data.lastname}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default AuthorItemComponent;
