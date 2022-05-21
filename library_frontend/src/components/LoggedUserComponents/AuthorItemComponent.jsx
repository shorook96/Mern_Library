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
      <Card style={{ width: '18rem' }} className="text-black">
        <Card.Img variant="top" src={data.photo} width={100} height={300} />
        <Card.Body>
          <Card.Title>{data.firstname}</Card.Title>
          <Card.Text>{data.lastname}</Card.Text>

          <Link to={'/Author/' + data._id} className="btn btn-primary">
            More details
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default AuthorItemComponent;
