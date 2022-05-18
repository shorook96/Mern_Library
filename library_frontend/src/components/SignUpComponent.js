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
    'Passwords must match'
  ),
});

const SignUpComponent = ({ clicked, handleSignUpClose }) => {
  const [image, setImage] = useState({});
  const [URL, setURL] = useState('');

  const handleUpload = () => {
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
          .then((url) => {
            console.log(url);
            setURL(url);
          });
      }
    );
  };
  const changBackGround = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const onSubmit = (values, { resetForm }) => {
    // console.log(values);
    handleUpload();
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
  };
  return (
    <Modal
      show={clicked}
      onHide={handleSignUpClose}
      backdrop="static"
      className="text-dark"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a free account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
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
            </div>

            <div className="mb-3">
              <label htmlFor="Fname">FirstName</label>
              <Field type="text" id="Fname" name="Fname" autoFocus />
              <ErrorMessage name="Fname">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-3">
              <label htmlFor="Lname">LastName</label>
              <Field type="text" id="Lname" name="Lname" />
              <ErrorMessage name="Lname">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email address</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword">Retype Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage name="confirmPassword">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>

            <Button type="submit" variant="primary" onClick={handleSignUpClose}>
              SignUp
            </Button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSignUpClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SignUpComponent;
