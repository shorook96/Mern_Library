import React from 'react';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import userlogo from '../../assets/userimages/userlogo.png';
import { UseAuth } from '../Helpers/Auth';
const UserLogoComponent = () => {
  const { logout, user } = UseAuth();

  return (
    <div className="d-flex m-2">
      <Link to="/user/myprofile">
        <Image
          roundedCircle
          src={user.userInfo.image || userlogo}
          width={50}
          height={50}
        />
      </Link>
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
