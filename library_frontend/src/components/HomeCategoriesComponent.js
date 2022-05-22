import { React, useState, useEffect } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const HomeCategoriesComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/topRatedcategories', {})
      .then((response) => {
        console.log(response.data);
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
            <Col md={7} className="">
              <div className="books-header">
                <p className="font-weight-bolder Header-Title h1">
                  Top Rated Categories
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
            <Col md={5}>
              <Carousel
                className="text-dark custom-carousel text-center rounded mt-5"
                variant="dark"
              >
                <Carousel.Item interval={1100}>
                  <h3 className="d-block w-100 rounded-circle cutome-category-home">
                    {data[0].category.categoryName}
                  </h3>
                </Carousel.Item>
                <Carousel.Item interval={1100}>
                  <h3 className="d-block w-100 rounded-circle cutome-category-home">
                    {data[1].category.categoryName}
                  </h3>
                </Carousel.Item>
                <Carousel.Item interval={1100}>
                  <h3 className="d-block w-100 rounded-circle cutome-category-home">
                    {data[2].category.categoryName}
                  </h3>
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

export default HomeCategoriesComponent;
