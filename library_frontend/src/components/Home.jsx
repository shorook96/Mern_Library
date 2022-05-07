import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../App.css';
import SideBar from './SideBar';

export default function HomeComponent() {
  return (
    <>
      <div className=" d-flex position-fixed">
        <SideBar />
      </div>
      <Container className="bg">
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
