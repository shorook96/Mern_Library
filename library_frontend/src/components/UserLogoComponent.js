import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import userlogo from '../assets/userimages/userlogo.png';
const UserLogoComponent = () => {
  return (
    <div class="d-flex ">
      <Image roundedCircle src={userlogo} width={50} height={50} />
      <button className="btn">
        <i class="fa fa-sign-out " aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default UserLogoComponent;
