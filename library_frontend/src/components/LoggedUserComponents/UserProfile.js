import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import userlogo from '../../assets/userimages/userlogo.png';
import { UseAuth } from '../Helpers/Auth';

const UserProfile = () => {
  const { user } = UseAuth();

  return (
    <>
      <Container className="w-50 text-center bg-white mt-5 rounded">
        <Container>
          <Image
            rounded
            src={user.userInfo.image}
            width={150}
            height={50}
            className="img-fluid mt-2"
          />
        </Container>
        <Container>
          <table className="table  ">
            <tbody>
              <tr>
                <th>First Name </th>
                <th>{user.userInfo.fname}</th>
              </tr>
              <tr>
                <th>Last Name </th>
                <th>{user.userInfo.lastname}</th>
              </tr>
              <tr>
                <th>email </th>
                <th>{user.userInfo.email}</th>
              </tr>
              <tr>
                <th>Number of Books </th>
                <th>{user.userInfo.books.length}</th>
              </tr>
              <tr>
                <th colSpan={2}>
                  {' '}
                  <Button className="w-25">Edit</Button>
                </th>
              </tr>
            </tbody>
          </table>
        </Container>
      </Container>
    </>
  );
};

export default UserProfile;
