import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';


export default function Card(props) {
  console.log(props.name);
  return (
    <div class="Card">
      <MDBCard style={{ width: '18rem' }}>
        <MDBCardImage
          src={props.im}
          alt="..."
          position="top"
          style={{ height: '22.5rem' }}
        />
        <MDBCardBody>
          <MDBCardText style={{ color: 'black', textAllignement: 'center' }}>
            {props.name}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
