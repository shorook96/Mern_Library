import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, UserLocation } from 'react-router-dom';
import axios from 'axios'
import { UseAuth } from '../Helpers/Auth';

const BookItemComponent = ({ data }) => {
  const navigate = useNavigate();
  const {user} = UseAuth()

  const goToDetails = () => {
    navigate('/books/:bookid', { state: { book: data } });
  };

  const addToMyBooks = () =>{
    const book = {book:data._id, state:"Want To Read"}
    axios
      .post(
        `http://localhost:5000/user/${user.userInfo.id}/book`,book,
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }
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
          <Button variant="primary" onClick={addToMyBooks}>
            Add
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookItemComponent;
