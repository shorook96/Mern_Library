import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemsContainer = ({ currentPageContent, RenderComponent }) => {
  return (
    <Container className="text-center m-auto ">
      <Row>
        {currentPageContent.map((item, idx) => (
          <Col key={item.book !== undefined ? item.book._id : item._id} md={6}>
            <RenderComponent data={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemsContainer;
