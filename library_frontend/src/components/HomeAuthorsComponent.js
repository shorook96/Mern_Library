import { React, useState, useEffect } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import AuthorHomePart from './AuthorHomePart';
import axios from 'axios';

const HomeAuthorsComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/topRatedAuthors', {})
      .then((response) => {
        // console.log(response)
        setData(response.data);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr ' + error);
      });
  }, []);
  return (
    <>
      {data.length ? (
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
            {/* <Col
              md={5}
              className="bg-secondary rounded-circle authors-background-image "
            >  */}
            <Col md={5}>
              <Carousel className="text-dark text-center rounded custom-author-carousel ">
                <Carousel.Item interval={1000} className="ui-card">
                  <img
                    className="w-100 custom-card-img"
                    src={data[0].author.photo}
                    alt="First slide"
                    width={500}
                    height={300}

                  />
                  <Carousel.Caption className="info mb-3">
                    <h3>{`${data[2].author.firstname} ${data[2].author.firstname}`}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500} className="ui-card">
                  <img
                    className=" w-100 custom-card-img"
                    src={data[1].author.photo}
                    alt="Second slide"
                    width={500}
                    height={300}
                  />
                  <Carousel.Caption className="info mb-3">
                    <h3>{`${data[2].author.firstname} ${data[2].author.firstname}`}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="ui-card">
                  <img
                    className=" w-100 custom-card-img "
                    src={data[2].author.photo}
                    alt="Third slide"
                    width={500}
                    height={300}
                  />
                  <Carousel.Caption className="info mb-3">
                    <h3>{`${data[2].author.firstname} ${data[2].author.firstname}`}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              
            </Col>
          </Row>
        </Container>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
};

export default HomeAuthorsComponent;
