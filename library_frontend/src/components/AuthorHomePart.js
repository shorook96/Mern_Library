import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import userlogo from '../assets/userimages/userlogo.png';
const AuthorHomePart = ({ isImgRight, author }) => {
  return (
    <>
      <div className="bg-danger text-center rounded author-container-Home mt-3">
        <Row className="author-text-Home">
          <Col md={9}>
            <p>{`${author.firstname} ${author.lastname}`} </p>
          </Col>
          <Col md={3}>
            <img
              src={author.photo}
              width={80}
              height={80}
              className={
                isImgRight
                  ? 'img-fluid float-left rounded-circle author-image-Home-right'
                  : 'img-fluid float-left rounded-circle author-image-Home-left'
              }
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AuthorHomePart;
