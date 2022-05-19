import {React, useState, useEffect} from 'react';
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

  const [data, setData] = useState({})
  useEffect(() => {
    axios
      .get('http://localhost:5000/topRated', {
  
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  },[])
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
          <HomeCategoriesComponent />
        </Container>
        <Container className="text-center mt-2">
          <img src={rightarrow} width={200} height={200} />
        </Container>
        <Container>
          <HomeStartImages />
          <Container className="text-center">
            <img src={leftarrow} width={200} height={200} />
          </Container>

          <HomeAuthorsComponent />
        </Container>
        <Footer />
      </div>
    </>
  );
}
