import React from 'react';
import { Container } from 'react-bootstrap';
import leaderphoto from '../assets/TeamPhotos/leader.jpeg';
import zahra from '../assets/TeamPhotos/zahra.jpg';
import kholoud from '../assets/TeamPhotos/kholoud.jpg';
import islam from '../assets/TeamPhotos/islam.jpg';
const AboutUs = () => {
  return (
    <>
      <Container className="mt-5">
        <div className="custom-owner-container ">
          <div className="box ">
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
            <img src={zahra} className="owner-card-img" />
            <div className="owner-back">
              <h5>Alzahraa Eid</h5>
              <h5>Team Member of goodReads Project</h5>
              <div className="links-container ">
                <a
                  href="https://github.com/ELzahraaeid"
                  target="_blank"
                  className="owner-link"
                >
                  <i class="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/alzahraa-eid/"
                  target="_blank"
                  className="owner-link "
                >
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="box">
            <img src={kholoud} className="owner-card-img" />
            <div className="owner-back">
              <h5>kholoud Ahmed</h5>
              <h5>Team Member of goodReads Project</h5>
              <div className="links-container ">
                <a
                  href="https://github.com/KholoudAhmed"
                  target="_blank"
                  className="owner-link"
                >
                  <i class="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/kholoud-ahmed-0b5660192"
                  target="_blank"
                  className="owner-link "
                >
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="box">
            <img src={islam} className="owner-card-img" />
            <div className="owner-back">
              <h5>Islam Kortam</h5>
              <h5>Team Member of goodReads Project</h5>
              <div className="links-container ">
                <a
                  href="https://github.com/IslamKortam"
                  target="_blank"
                  className="owner-link"
                >
                  <i class="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/imkortam/"
                  target="_blank"
                  className="owner-link "
                >
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutUs;
