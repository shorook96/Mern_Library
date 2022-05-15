import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import userlogo from '../assets/userimages/userlogo.png';
const AuthorHomePart = ({ isImgRight }) => {
  return (
    <>
      <div className="bg-danger text-center rounded author-container-Home ">
        <Row className="author-text-Home">
          <Col md={9}>
            <p>lormmmmm kmkmdm</p>
          </Col>
          <Col md={3}>
            <img
              src={userlogo}
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
