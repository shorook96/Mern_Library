import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HomeStartImages from './HomeStartImages';
import '../App.css';
import SideBar from './SideBar';
import rightarrow from '../assets/images/right-arrow.webp';
import leftarrow from '../assets/images/left-arrow.webp';
import HomeAuthorsComponent from './HomeAuthorsComponent';
import cover from '../assets/images/hercover.jpg';
let loggedIn = false;

export default function HomeComponent() {
  return (
    <>
      <div className="d-flex">
        {loggedIn ? <div>{<SideBar />}</div> : null}
        <Container className="cover-home text-center"></Container>
      </div>
      <div className="mt-5">
        <Container >
          <HomeStartImages />
          <Container className="text-center m-5">
            <img src={leftarrow} width={200} height={200} />
          </Container>

          <HomeAuthorsComponent />
        </Container>
      </div>
    </>
  );
}
