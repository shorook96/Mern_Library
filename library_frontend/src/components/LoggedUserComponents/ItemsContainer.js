import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemComponent from './ItemComponent';

const ItemsContainer = ({ currentPageContent }) => {
  return (
    <Container>
      <Row>
        {currentPageContent.map((item, idx) => (
          <Col key={idx}>
            <ItemComponent data={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemsContainer;
