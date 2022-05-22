import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemsContainer = ({ currentPageContent, RenderComponent }) => {
  return (
    <Container className="text-center m-auto mt-2 ">
      <Row>
        {currentPageContent.map((item, idx) => (
          <Col
            sm={6}
            md={currentPageContent.length === 2 ? { span: 4 } : 4}
            key={item.book !== undefined ? item.book._id : item._id}
          >
            <RenderComponent data={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemsContainer;
