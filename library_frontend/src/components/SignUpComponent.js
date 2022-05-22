import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import userlogo from '../assets/userimages/userlogo.png';
import * as Yup from 'yup';
import axios from 'axios';
import { storage } from './Helpers/FirebaseHelper';
const initialValues = {
  Fname: '',
  Lname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  Fname: Yup.string().required('Required*'),
  Lname: Yup.string().required('Required*'),
  email: Yup.string().email('invalid Email Address').required('Required*'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords does not match'
  ),
});

const SignUpComponent = ({ clicked, handleSignUpClose }) => {
  const [image, setImage] = useState({});
  const [URL, setURL] = useState('');

  const handleUpload = (values, resetForm) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_change',
      (snapshot) => {}, //current progress
      (error) => {},
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((URL) => {
            console.log(URL);
            const data = { ...values, URL };
            console.log(data);
            axios
              .post('http://localhost:5000/user/signup', data)
              .then((response) => {
                console.log('entered response');
                console.log(response);
              })
              .catch((error) => {
                console.log('entered error');
                console.log(error);
              });
            setImage({});
            setURL('');
            resetForm({ values: '' });
          });
      }
    );
  };
  const changBackGround = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("image"+e.target.files[0]);
    }
  };

  const onSubmit = (values, { resetForm }) => {
    
    handleUpload(values, resetForm);
  };
  return (
    <Modal
      show={clicked}
      onHide={handleSignUpClose}
      backdrop="static"
      className="text-dark"
      centered
    >
      
      <Modal.Body className='backGroundModalSignUp'>
      
      
      {/* <button type="button" class="btn-close btn-close" aria-label="Close"
        style={{float:'right', fontSize:"20px"}} 
        onClick={handleSignUpClose}></button> */}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
        const { isValid, dirty } = formik;
        return (
          <Form>
            <div className="mb-3">
              <div
                className="wrapper"
                style={{
                  backgroundImage: image.name
                    ? `url(${window.URL.createObjectURL(image)})`
                    : `url(${userlogo})`,
                }}
              >
                <input
                  type="file"
                  id="img"
                  name="img"
                  className="file-input"
                  onChange={changBackGround}
                />
              </div>
              <button type="button" class="btn-close btn-close" aria-label="Close"
              style={{float:'right', fontSize:"20px",clear: 'both'}} 
              onClick={handleSignUpClose}></button>
            </div>
            <h3 className="mb-4 p-3" style={{ textAlign: 'center' }}>
          goodReads
        </h3>
            <div className="mb-2 ">
              <label htmlFor="Fname" className='ms-3 ps-5' style = {{ marginRight : '6%' }}>FirstName</label>
              <Field type="text" id="Fname" name="Fname" className="border-dark rounded-pill ms-4 " />
              <ErrorMessage name="Fname">
                {(error) => <div className="error" style = {{ marginLeft : '42%' }}>{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-2 ">
              <label htmlFor="Lname" className='ms-3 ps-5'  style = {{ marginRight : '6%' }}>LastName</label>
              <Field type="text" id="Lname" name="Lname" className="border-dark rounded-pill ms-4 "/>
              <ErrorMessage name="Lname">
                {(error) => <div className="error" style = {{ marginLeft : '42%' }}>{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-2 ">
              <label htmlFor="email" className='ms-3 ps-5'  style = {{ marginRight : '4%' }}>Email address</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                className="border-dark rounded-pill ms-2 "
              />
              <ErrorMessage name="email">
                {(error) => <div className="error" style = {{ marginLeft : '42%' }}>{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className='ms-3 ps-5' style = {{ marginRight : '11%' }}>Password</label>
              <Field type="password" id="password" name="password" className="border-dark rounded-pill ms-2 " />
              <ErrorMessage name="password">
                {(error) => <div className="error" style = {{ marginLeft : '42%' }}>{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-2 ">
              <label htmlFor="confirmPassword" className='ms-3 ps-5'>Retype Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border-dark rounded-pill ms-2 mb-3 "
              />
              <ErrorMessage name="confirmPassword">
                {(error) => <div className="error" style = {{ marginLeft : '42%' }}>{error}</div>}
              </ErrorMessage>
            </div>

            <button type="submit" variant="primary" 
            onClick={handleSignUpClose}
            className={!(dirty && isValid) ? "disabled-btn rounded-pill mb-4 btn-success" : "rounded-pill"}
            disabled={!(dirty && isValid)}
            style={{width:'50%', height:'0.1%', marginLeft : '26%',  color:'black'}}
            >
              SignUp
            </button>
          </Form>
          )}}
        </Formik>
      </Modal.Body>
      
    </Modal>
  );
};
export default SignUpComponent;
