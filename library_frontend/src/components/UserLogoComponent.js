import React from 'react';
import Image from 'react-bootstrap/Image';
import userlogo from '../assets/userimages/userlogo.png';
import { UseAuth } from './Helpers/Auth';
const UserLogoComponent = () => {
  const { logout } = UseAuth();

  return (
    <div className="d-flex m-2">
      <Image roundedCircle src={userlogo} width={50} height={50} />
      <button
        className="btn btn-outline-success m-2"
        title="logout"
        onClick={() => logout(null)}
      >
        <i className="fa fa-sign-out " aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default UserLogoComponent;
