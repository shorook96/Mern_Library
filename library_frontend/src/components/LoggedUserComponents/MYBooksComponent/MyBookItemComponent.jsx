import axios from 'axios';
import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UseAuth } from '../../Helpers/Auth';
import AverageRating from '../Ratings/AverageRating';
import Rating from '../Ratings/rating';

const MyBookItemComponent = ({ data }) => {
  const { user } = UseAuth();

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
        data.state = state;
      })
      .catch((error) => {});
  };
  return (
    <>
      <Card className="text-black mt-3 book-card-item">
        <div className="ui-card d-flex">
          <Card.Img
            variant="top"
            src={data.book.photo}
            width={100}
            height={300}
            className="custom-card-img"
          />
          <div className="info">
            <h3>
              <h4>{data.book.bookName}</h4>
              <AverageRating
                currentlyRating={Math.floor(
                  data.book.rating.totalRate / data.book.rating.numberOfRates
                )}
              />
              <h5>Book Rating</h5>
            </h3>
            <Link
              to={'/Book/' + data.book._id}
              className="btn btn-outline-success details-btn"
            >
              Show Details
            </Link>
          </div>
        </div>

        <Card.Body>
          <Form.Select
            aria-label="Default select example"
            onChange={changeState}
            className="bg-success text-white"
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
          <Card.Title>
            <Rating bookId={data.book._id} currentlyRating={data.userRating} />
            <p className="rate-style text-secondary">Rate this Book</p>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyBookItemComponent;
