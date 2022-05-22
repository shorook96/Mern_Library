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
              <h5>Team Leader of goodReads Project</h5>
              <div className="links-container ">
                <a
                  href="https://github.com/mina2508"
                  target="_blank"
                  className="owner-link"
                >
                  <i class="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/mina-kameel-019728145/"
                  target="_blank"
                  className="owner-link "
                >
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </div>
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
