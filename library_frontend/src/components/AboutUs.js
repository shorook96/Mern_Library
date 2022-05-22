import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import leaderphoto from '../assets/TeamPhotos/leader.jpeg';
const AboutUs = () => {
  return (
    <>
      <Container className="mt-5">
        <div className="custom-owner-container">
          <div className="box">
            <img src={leaderphoto} className="owner-card-img" />
            <div className="owner-back">
              <h5>Mina Kameel Nashed</h5>
              {/*<h5>Software Developer</h5> */}
            </div>
          </div>
          <div className="box">
            <img src={leaderphoto} className="owner-card-img" />
            <div className="owner-back">
              <h5>Mina Kameel Nashed</h5>
              {/*<h5>Software Developer</h5> */}
            </div>
          </div>
          <div className="box">
            <img src={leaderphoto} className="owner-card-img" />
            <div className="owner-back">
              <h5>Mina Kameel Nashed</h5>
              {/*<h5>Software Developer</h5> */}
            </div>
          </div>
          <div className="box">
            <img src={leaderphoto} className="owner-card-img" />
            <div className="owner-back">
              <h5>Mina Kameel Nashed</h5>
              {/*<h5>Software Developer</h5> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutUs;
