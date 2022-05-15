import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthorHomePart from './AuthorHomePart';
import HomeStartImages from './HomeStartImages';

const HomeAuthorsComponent = () => {
  return (
    <>
      <Container className="m-5 ">
        <Row>
          <Col
            md={5}
            className="bg-secondary rounded-circle authors-background-image"
          >
            <Container className="text-center authors-conten p-1">
              <Row>
                <Col sm={3} className="hide-column"></Col>

                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={true} />
                </Col>
              </Row>
              <Row>
                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={false} />
                </Col>
                <Col sm={3} className="hide-column"></Col>
              </Row>
              <Row>
                <Col sm={3} className="hide-column"></Col>
                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={true} />
                </Col>
              </Row>
              <Row>
                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={false} />
                </Col>
                <Col sm={3} className="hide-column"></Col>
              </Row>
            </Container>
          </Col>
          <Col md={6}>
            <div className="books-header text-white">
              <p className="font-weight-bolder Header-Title h1">
                Famous Authors
              </p>
              <Container className="text-center">
                <p className="book-header-desc">
                  If you want the best of the best, these six star books won’t
                  disappoint . Here are 6 of all-time favorite books to our
                  reader to read.
                </p>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeAuthorsComponent;
