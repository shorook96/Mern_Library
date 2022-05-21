import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { UseAuth } from '../Helpers/Auth';
import Rating from './rating';

const MyBookItemComponent = ({ data }) => {
  const { user } = UseAuth();
  console.log(data);

  const goToDetails = () => {};
  const changeState = (e) => {
    const state = e.target.value;
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
            className="/custom-card-img"
          />
          <div className="info">
            <h3>{data.book.bookName}</h3>
            <p>one of the best books ever </p>
            <Button variant="primary" onClick={goToDetails}>
              Check Details
            </Button>
          </div>
        </div>

        <Card.Body>
          <Card.Title>
            <Rating bookId={data.book._id} currentlyRating={data.userRating} />
          </Card.Title>

          <Form.Select
            aria-label="Default select example"
            onChange={changeState}
          >
            <option value="Read" selected={data.state === 'Read'}>
              Read
            </option>
            <option
              value="Currently Reading"
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
