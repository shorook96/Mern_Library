import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, UserLocation } from 'react-router-dom';
import axios from 'axios';
import { UseAuth } from '../Helpers/Auth';

const BookItemComponent = ({ data }) => {
  const navigate = useNavigate();
  const { user, login } = UseAuth();
  const book = user.userInfo.books.find((element) => element.book === data._id);
  const goToDetails = () => {
    navigate('/books/:bookid', { state: { book: data } });
  };

  const addToMyBooks = () => {
    const addedBook = { book: data._id, state: 'Want To Read' };
    console.log(addedBook);
    axios
      .post(
        `http://localhost:5000/user/${user.userInfo.id}/book`,
        { addedBook },
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const newUser = response.data.userInfo;
        console.log(newUser);
        login({ ...user, ...newUser });
        console.log(user);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  };
  return (
    <>
      <Card style={{ width: '18rem' }} className="text-black m-auto">
        <Card.Img variant="top" src={data.photo} width={100} height={300} />
        <Card.Body>
          <Card.Title>{data.bookName}</Card.Title>
          <Card.Text>{data.bookName}</Card.Text>
          <Button variant="primary" onClick={goToDetails}>
            Go somewhere
          </Button>
          {book ? (
            <Button variant="secondary" disabled>
              Already Have It
            </Button>
          ) : (
            <Button variant="primary" onClick={addToMyBooks}>
              Add
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default BookItemComponent;
