import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HomeStartImages from './HomeStartImages';
import '../App.css';
import leftarrow from '../assets/images/left-arrow.webp';
import HomeAuthorsComponent from './HomeAuthorsComponent';

export default function HomeComponent() {
  return (
    <>
      <div className="d-flex container">
        <div className="cover-home ">
          <div className="cover-home-opacity m-0">
            <Row>
              <Col>
                <h1>Meet your next favorite book</h1>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Container>
          <HomeStartImages />
          <Container className="text-center">
            <img src={leftarrow} width={200} height={200} />
          </Container>

          <HomeAuthorsComponent />
          {/* <BooksSlider /> */}
        </Container>
      </div>
    </>
  );
}
