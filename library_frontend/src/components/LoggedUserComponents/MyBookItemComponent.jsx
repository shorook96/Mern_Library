import axios from 'axios';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { UseAuth } from '../Helpers/Auth';

const MyBookItemComponent = ({ data }) => {
  const { login, user } = UseAuth();
  const goToDetails = () => {};
  const changeState = (e) => {
    // axios
    //   .patch(
    //     `http://localhost:5000/user/${user.userInfo.id}/book/:bookId`,
    //     {},
    //     {
    //       headers: {
    //         authorization: user.userInfo.authorization,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     // const newUser = response.data.userInfo;
    //     const books = user.userInfo.books.push(addedBook);
    //     const newuser = { ...user, books };
    //     login(newuser);
    //   })
    //   .catch((error) => {
    //     console.log('error ' + error);
    //   });
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
          <Form.Select
            aria-label="Default select example"
            onChange={changeState}
          >
            <option value="Want To Read">Want To Read</option>
            <option value="Want To Read">Read</option>
            <option value="Want To Read">Currentle Reading</option>
          </Form.Select>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyBookItemComponent;
