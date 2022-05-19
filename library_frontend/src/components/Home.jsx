import { React, useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HomeStartImages from './HomeStartImages';
import '../App.css';
import leftarrow from '../assets/images/left-arrow.webp';
import rightarrow from '../assets/images/right-arrow.webp';
import HomeAuthorsComponent from './HomeAuthorsComponent';
import HomeCategoriesComponent from './HomeCategoriesComponent';
import Footer from './Footer';
import axios from 'axios';

export default function HomeComponent() {
 

  return (
    <>
      <div className="d-flex container">
        <div className="cover-home ">
          <div className="cover-home-opacity m-0">
            <Row>
              <Col>{/* <h1>Meet your next favorite book</h1> */}</Col>
              <Col></Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Container>
          <Container className='mt-5"'>
            <HomeCategoriesComponent />
          </Container>
          <Container className="text-center mt-5">
            <img src={leftarrow} width={200} height={200} />
          </Container>
          <Container className="mt-2">
            <HomeStartImages />
          </Container>
          <Container className="text-center mt-5">
            <img src={rightarrow} width={200} height={200} />
          </Container>

          <Container className="mt-2">
            <HomeAuthorsComponent />
          </Container>
        </Container>
      </div>
    </>

    // <h1>Data</h1>
  );
}
