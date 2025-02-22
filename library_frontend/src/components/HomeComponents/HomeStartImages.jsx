import { React, useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';
import shelf from '../../assets/images/shelf.png';

export default function HomeStartImages() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/topRatedbooks', {})
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      {data.length ? (
        <Container className="mt-5">
          <Row>
            <Col md={5}>
              <Row>
                <Col sm={12} md={4} className="text-center">
                  <img
                    src={data[0].photo}
                    alt="img1"
                    height={200}
                    width={200}
                    className="img-fluid-custom"
                  />
                </Col>
                <Col sm={12} md={4} className="text-center">
                  <img
                    src={data[1].photo}
                    alt="img2"
                    height={200}
                    width={200}
                    className="img-fluid-custom"
                  />
                </Col>
                <Col sm={12} md={4} className="text-center">
                  <img
                    src={data[2].photo}
                    height={200}
                    width={200}
                    alt="img3"
                    className="img-fluid-custom"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src={shelf}
                    alt="img4"
                    className="img-fluid align-text-top"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={4} className=" text-center">
                  <img
                    src={data[3].photo}
                    height={200}
                    width={200}
                    alt="img4"
                    className="img-fluid-custom"
                  />
                </Col>
                <Col sm={12} md={4} className=" text-center">
                  <img
                    src={data[4].photo}
                    height={200}
                    width={200}
                    alt="img5"
                    className="img-fluid-custom"
                  />
                </Col>
                <Col sm={12} md={4} className=" text-center">
                  <img
                    src={data[5].photo}
                    height={200}
                    width={200}
                    alt="img6"
                    className="img-fluid-custom"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <img
                    src={shelf}
                    alt="img4"
                    className="img-fluid align-text-top"
                  />
                </Col>
              </Row>
            </Col>
            <Col md={7} className="p-5 ml-1 ">
              <div className="books-header">
                <p className="font-weight-bolder Header-Title h1">
                  Top Rated Books
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
          </Row>
        </Container>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
}
