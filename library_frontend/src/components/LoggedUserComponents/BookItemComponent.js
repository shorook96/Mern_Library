import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, UserLocation } from 'react-router-dom';
import axios from 'axios';
import { UseAuth } from '../Helpers/Auth';
import {Link} from "react-router-dom";

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
      .patch(
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
        // const newUser = response.data.userInfo;
        const books = user.userInfo.books.push(addedBook);
        const newuser = { ...user, books };

        login(newuser);
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  };
  return (
    <>
      <Card style={{ width: '18rem' }} className="text-black m-auto">
        <div className="ui-card d-flex">
          <Card.Img
            variant="top"
            src={data.photo}
            width={100}
            height={300}
            className="custom-card-img"
          />
          <div className="info">
            <h3>some info about the book</h3>
            <p>sbjvcbj basjbcbbba naknkjndakj </p>
            <Button variant="primary" onClick={goToDetails}>
              Go somewherey
            </Button>
            
          </div>
        </div>
        <Card.Body>
          <Card.Title>{data.bookName}</Card.Title>
          <Card.Text>{data.bookName}</Card.Text>
          <Button variant="primary">
          <Link style={{ color: '#FFF' ,  textDecoration: 'none' }} to={'/Book/'+data._id}> Show More Details </Link>

          </Button>
          {book ? (
            <Button variant="secondary" disabled className=" mt-1">
              Already Have It
            </Button>
          ) : (
            <Button
              variant="primary"
              className="px-5 mt-1"
              onClick={addToMyBooks}
            >
              Add
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default BookItemComponent;
