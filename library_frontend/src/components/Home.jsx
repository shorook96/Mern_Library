import { React, useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HomeStartImages from './HomeStartImages';
import '../App.css';
import leftarrow from '../assets/images/left-arrow.webp';
import rightarrow from '../assets/images/right-arrow.webp';
import HomeAuthorsComponent from './HomeAuthorsComponent';
import HomeCategoriesComponent from './HomeCategoriesComponent';
import Footer from './Footer';

export default function HomeComponent() {
<<<<<<< HEAD
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost:5000/topRated', {})
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, []);
=======

  
>>>>>>> 3ec26e8d533e8c356aca0302acd3da8dd28f7218
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
            <HomeCategoriesComponent/>
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
<<<<<<< HEAD
      </div>
    </>
=======

        <Footer />
      </div> </>
        // <h1>Data</h1>
      
>>>>>>> 3ec26e8d533e8c356aca0302acd3da8dd28f7218
  );
};







