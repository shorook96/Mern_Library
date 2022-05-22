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
<<<<<<< HEAD
      <Card style={{ width: '18rem' }} className="text-black">
        <Card.Img variant="top" src={data.photo} width={100} height={300} />
        <Card.Body>
          <Card.Title>{data.firstname}</Card.Title>
          <Card.Text>{data.lastname}</Card.Text>
          <Button variant="primary">
          <Link style={{ color: '#FFF' ,  textDecoration: 'none' }} to={'/Author/'+data._id} > More details </Link>
          </Button>
        </Card.Body>
=======
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
>>>>>>> 837f14376a3b941eb90b700013a76792d9e44aba
      </Card>
    </>
  );
};

export default AuthorItemComponent;
