import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../App.css';
import SideBar from './SideBar';

export default function HomeComponent() {
  return (
    <>
      <div className="mt-5 d-flex position-fixed">
        <SideBar />
      </div>
      <Container>
        <Row>
          <Col sm={12} md={12} className="bg"></Col>
        </Row>
      </Container>
    </>
  );
}
