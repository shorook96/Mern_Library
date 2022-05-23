import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className=" mt-2" color="white" bgColor="dark">
      <MDBContainer className="p-4">
      
        <section className="mb-4">
                <p className='goodreadsFooter' >goodReads</p>
        </section>
      
        <hr/>
        
        <section className="mb-5">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            
              <h5 className="text-uppercase">About</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    about us
                  </a>
                </li>  
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Terms & Conditions</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>


        <section className="" style={{marginLeft:'35%'}}>
          
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </a>
        </section>
      </MDBContainer>

      
    </MDBFooter>
  );
}
