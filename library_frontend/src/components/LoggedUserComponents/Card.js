import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
// 'https://prod-images.tcm.com/Master-Profile-Images/WaltDisney.jpg'

export default function Card(props) {
  console.log(props.name);
  return (
    <div class="Card">
      <MDBCard style={{ width: '18rem' }}>
        <MDBCardImage src={props.im} alt="..." position="top" />
        <MDBCardBody>
          <MDBCardText>{props.name}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
