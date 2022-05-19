import {React, useState, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AuthorHomePart from './AuthorHomePart';
import HomeStartImages from './HomeStartImages';
import axios from 'axios';

const HomeAuthorsComponent = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/topRatedcategories', {
  
      })
      .then((response) => {
        console.log(response)
        setData(response.data.books)
        
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  },[])
  return (
    <>
      {data.length? (
      <Container>
        <Row>
          <Col md={7}>
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
          <Col
            md={5}
            className="bg-secondary rounded-circle authors-background-image "
          >
            <Container className="text-center authors-conten p-1">
              <Row>
                <Col sm={3} className="hide-column"></Col>

                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={true} author={data[0].author}/>
                </Col>
              </Row>
              <Row>
                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={false} author={data[1].author}/>
                </Col>
                <Col sm={3} className="hide-column"></Col>
              </Row>
              <Row>
                <Col sm={3} className="hide-column"></Col>
                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={true} author={data[2].author}/>
                </Col>
              </Row>
              <Row>
                <Col sm={9} className="p-3">
                  <AuthorHomePart isImgRight={false} author={data[0].author}/>
                </Col>
                <Col sm={3} className="hide-column"></Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
   ) :<h1>loading...</h1>}
   </>
  );
};

export default HomeAuthorsComponent;
