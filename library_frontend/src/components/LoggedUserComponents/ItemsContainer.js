import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemsContainer = ({ currentPageContent }) => {
  return (
    <Container>
      <Row>
        {currentPageContent.map((Item, idx) => (
          <Col key={idx}>
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" src={Item.photo} alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{Item.bookName}</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link to=" " class="btn btn-primary">
                  Go somewhere
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemsContainer;
