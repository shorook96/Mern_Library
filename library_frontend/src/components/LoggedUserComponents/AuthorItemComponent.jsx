import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// function GetAuthors() {
//   return fetch("http://localhost:5000/"+'authors/')
//       .then(response => response.json())
// }

const AuthorItemComponent = ({ data }) => {
  return (
    <>
      <Card style={{ width: '18rem' }} className="text-black mt-3">
        <div className="ui-card d-flex">
          <Card.Img
            variant="top"
            src={data.photo}
            width={100}
            height={300}
            className="custom-card-img"
          />
          <div className="info">
            <h3>{`${data.firstname} ${data.lastname}`}</h3>
            <Link
              to={'/Author/' + data._id}
              className="btn btn-outline-success details-btn m-1"
            >
              Show Details
            </Link>
            <Link
              to={`/user/authors/${data.firstname} ${data.lastname}/${data._id}/books`}
              className="btn btn-outline-success details-btn m-1"
            >
              Show Books
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AuthorItemComponent;
