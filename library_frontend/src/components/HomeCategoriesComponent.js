import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';

const HomeCategoriesComponent = () => {
  return (
    <Container>
      <Row>
        <Col md={7} className="">
          <div className="books-header">
            <p className="font-weight-bolder Header-Title h1">
              Top Rated Books
            </p>
            <Container className="text-center">
              <p className="book-header-desc">
                If you want the best of the best, these six star books won’t
                disappoint . Here are 6 of all-time favorite books to our reader
                to read.
              </p>
            </Container>
          </div>
        </Col>
        <Col md={5}>
          <Carousel className="">
            <Carousel.Item interval={1100}>
              <img
                className="d-block w-100 rounded-circle"
                src="https://media.gettyimages.com/photos/giza-egypt-pyramids-in-sunset-scene-wonders-of-the-world-picture-id1085205362?s=612x612"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1100}>
              <img
                className="d-block w-100 rounded-circle"
                src="https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1100}>
              <img
                className="d-block w-100 rounded-circle"
                src="https://media.gettyimages.com/photos/woman-standing-on-the-terrace-on-the-background-of-giza-pyramids-picture-id1306141437?s=612x612"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeCategoriesComponent;
