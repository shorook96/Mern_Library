import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthorHomePart from './AuthorHomePart';
import HomeStartImages from './HomeStartImages';

const HomeAuthorsComponent = () => {
  return (
    <>
      <Container className="bg-primary ">
        <Row>
          <Col md={7}></Col>
          <Col md={5} className="bg-secondary">
            <Row>
              <Col className="p-3">
                <AuthorHomePart isImgRight={false} />
              </Col>
              <Col className="hide-column"></Col>
            </Row>
            <Row>
              <Col className="hide-column"></Col>

              <Col className="p-3">
                <AuthorHomePart isImgRight={true} />
              </Col>
            </Row>
            <Row>
              <Col className="p-3">
                <AuthorHomePart isImgRight={false} />
              </Col>
              <Col className="hide-column"></Col>
            </Row>
            <Row>
              <Col className="hide-column"></Col>
              <Col className="p-3">
                <AuthorHomePart isImgRight={true} />
              </Col>
            </Row>
            <Row>
              <Col className="p-3">
                <AuthorHomePart isImgRight={false} />
              </Col>
              <Col className="hide-column"></Col>
            </Row>
            <Row>
              <Col className="hide-column"></Col>
              <Col className="p-3">
                <AuthorHomePart isImgRight={true} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <HomeStartImages />
    </>
  );
};

export default HomeAuthorsComponent;
