import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, UserLocation } from 'react-router-dom';

const BookItemComponent = ({ data }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate('/books/:bookid', { state: { book: data } });
  };
  return (
    <>
      <Card style={{ width: '18rem' }} className="text-black">
        <Card.Img variant="top" src={data.photo} />
        <Card.Body>
          <Card.Title>{data.bookName}</Card.Title>
          <Card.Text>{data.bookName}</Card.Text>
          <Button variant="primary" onClick={goToDetails}>
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookItemComponent;
