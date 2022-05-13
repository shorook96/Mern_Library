import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthorHomePart from './AuthorHomePart';
import HomeStartImages from './HomeStartImages';

const HomeAuthorsComponent = () => {
  return (
    <>
      <Container className=" ">
        <Row>
          <Col
            md={5}
            className="bg-secondary rounded-circle authors-background-image"
          >
            <Container className="text-center authors-conten">
              <Row>
                <Col md={4} className="hide-column"></Col>

                <Col md={8} className="p-3">
                  <AuthorHomePart isImgRight={true} />
                </Col>
              </Row>
              <Row>
                <Col md={8} className="p-3">
                  <AuthorHomePart isImgRight={false} />
                </Col>
                <Col md={4} className="hide-column"></Col>
              </Row>
              <Row>
                <Col md={4} className="hide-column"></Col>
                <Col md={8} className="p-3">
                  <AuthorHomePart isImgRight={true} />
                </Col>
              </Row>
              <Row>
                <Col md={8} className="p-3">
                  <AuthorHomePart isImgRight={false} />
                </Col>
                <Col md={4} className="hide-column"></Col>
              </Row>
            </Container>
          </Col>
          <Col md={7}></Col>
        </Row>
      </Container>
      <HomeStartImages />
    </>
  );
};

export default HomeAuthorsComponent;
