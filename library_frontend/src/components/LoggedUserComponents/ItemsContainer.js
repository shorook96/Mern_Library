import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ItemsContainer = ({ currentPageContent , RenderComponent}) => {
  return (
    <Container>
      <Row>
        {currentPageContent.map((item, idx) => (
          <Col key={idx}>
            
            <RenderComponent data={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemsContainer;
