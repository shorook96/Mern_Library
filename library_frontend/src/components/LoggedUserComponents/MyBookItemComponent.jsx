import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { UseAuth } from '../Helpers/Auth';

const MyBookItemComponent = ({ data }) => {
  const { user } = UseAuth();
  const goToDetails = () => {};
  const changeState = (e) => {
    const state = e.target.value;
    console.log(state);
    axios
      .patch(
        `http://localhost:5000/user/${user.userInfo.id}/mybook/${data.book._id}`,
        { state },
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        console.log(response);
        data.state = state;
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
            src={data.book.photo}
            width={100}
            height={300}
            className="custom-card-img"
          />
          <div className="info">
            <h3>some info about the book</h3>
            <p>sbjvcbj basjbcbbba naknkjndakj </p>
            <Button variant="primary" onClick={goToDetails}>
              Go somewhere
            </Button>
          </div>
        </div>

        <Card.Body>
          <Card.Title>{data.book.bookName}</Card.Title>

          <Button variant="primary" onClick={goToDetails}>
            Go somewhere
          </Button>
          <Form.Select
            aria-label="Default select example"
            onChange={changeState}
          >
            <option value="Read" selected={data.state === 'Read'}>
              Read
            </option>
            <option
              value="Currentle Reading"
              selected={data.state === 'Currently Reading'}
            >
              Currently Reading
            </option>
            <option
              value="Want To Read"
              selected={data.state === 'Want To Read'}
            >
              Want To Read
            </option>
          </Form.Select>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyBookItemComponent;
