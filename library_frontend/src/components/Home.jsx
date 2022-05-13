import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HomeStartImages from './HomeStartImages';
import '../App.css';
import SideBar from './SideBar';
import HomeAuthorsComponent from './HomeAuthorsComponent';
let loggedIn = true;

// export default function HomeComponent(){
//     return(
//         <div className="bgHome">
//             <HomeStartImages/>
//         </div>
//     )

export default function HomeComponent() {
  return (
    <>
      <div className="d-flex position-relative">
        {loggedIn ? (
          <div>
            <SideBar />
          </div>
        ) : null}

        <Container>
          <HomeStartImages />

          <HomeAuthorsComponent />
        </Container>
      </div>
    </>
  );
}
