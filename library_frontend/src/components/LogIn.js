import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UseAuth } from './Helpers/Auth';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('invalid Email Address').required('Required*'),
  password: Yup.string().required('Password is required'),
});

const LogIn = ({ clicked, handleLogInClose }) => {
  const { login } = UseAuth();
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    axios
      .post('http://localhost:5000/user/login', values)
      .then((response) => {
        console.log(response.data);
        login(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    resetForm({ values: '' });
  };

  const bg = {
    overlay: {
      background: "#FFFF00"
    }
  };
  return (
    <Modal
      show={clicked}
      onHide={handleLogInClose}
      backdrop="static"
      className="text-dark "
      
      centered
      
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>Welcome Back</Modal.Title>
      </Modal.Header> */}
      <Modal.Body
      
      >
        <h3 className="mb-5 p-3" style={{textAlign: "center"}}>goodReads</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="mb-4 ms-4">
              <label htmlFor="email" className="ms-4 ps-5">Email Address</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                className="border-dark rounded-pill ms-2"
              />
              <ErrorMessage name="email">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>

            <div className="mb-4 ms-4">
              <label htmlFor="password" className="ms-4 ps-5">Password</label>
              <Field type="password" id="password" name="password" className="border-dark rounded-pill ms-2"/>
              <ErrorMessage name="password">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </div>
            <Button type="submit" variant="primary" onClick={handleLogInClose} className="mb-3">
              LogIn
            </Button>
          </Form>
        </Formik>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleLogInClose}>
          Cancel
        </Button>
        
      </Modal.Footer> */}
    </Modal>
  );
};
export default LogIn;
