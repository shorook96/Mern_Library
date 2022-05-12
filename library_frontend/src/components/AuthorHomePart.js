import React from 'react';
import { Container } from 'react-bootstrap';
import userlogo from '../assets/userimages/userlogo.png';
const AuthorHomePart = ({ isImgRight }) => {
  return (
    <>
      <div className="bg-danger text-center rounded author-container-Home ">
        <div className="author-text-Home">lormmmmm kmkmdm</div>
        <img
          src={userlogo}
          width={80}
          height={80}
          className={
            isImgRight
              ? 'img-fluid float-left rounded-circle author-image-Home-right'
              : 'img-fluid float-left rounded-circle author-image-Home-left'
          }
        />
      </div>
    </>
  );
};

export default AuthorHomePart;
