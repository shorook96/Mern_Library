import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UseAuth } from './Helpers/Auth';
import { useLocation, useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email Address').required('Required*'),
  password: Yup.string().required('Required*'),
});

const LogIn = ({ clicked, handleLogInClose, changeUrl }) => {
  const Location = useLocation();
  const redirectPath = Location.state?.path || '/';
  const { login } = UseAuth();
  // const [err, setErr] = useState('')


  const onSubmit = (values, { resetForm }) => {
    axios
      .post('http://localhost:5000/user/login', values)
      .then((response) => {
        console.log(response.data);
        login(response.data);

        changeUrl(redirectPath);
        
      })
      .catch((error) => {
        // setErr(error.response.data.message)
        alert(error.response.data.message)

        changeUrl('/');
      });

    resetForm({ values: '' });
  };

  return (
    <Modal
      show={clicked}
      onHide={handleLogInClose}
      backdrop="static"
      className="text-dark"
      centered
    >
      
      <Modal.Body className='backGroundModalLogin'>
      <div >
      <button type="button" class="btn-close btn-close-white" aria-label="Close"
      style={{float:'right', fontSize:"20px"}} 
      onClick={() => changeUrl()}></button>
      </div >
        <h3 className="mb-4 p-3 goodreads" style={{ textAlign: 'center', marginTop:"7%"}}>
          goodReads
        </h3>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
        const { isValid, dirty } = formik;
        return (
          <Form>
            <div className="mb-2 ">
              <label htmlFor="email" className="ms-4 ps-5" style={{fontFamily:"Snell Roundhand, cursive"}}>
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                className="border-dark rounded-pill ms-2"
                style ={{width:'50%'}}
              />
              <ErrorMessage name="email">
                {(error) => <div className="error" style = {{ marginLeft : '42%' }}>{error}</div>}
              </ErrorMessage>
            </div>

            <div className="mb-2 px-3">
              <label htmlFor="password" className="ms-4 ps-5" style={{fontFamily:"Snell Roundhand, cursive"}}>
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border-dark rounded-pill ms-4"
                style ={{width:'54%'}}
              />
              <ErrorMessage name="password">
                {(error) => <div className="error " style = {{ marginLeft : '41%' }}>{error}</div>}
              </ErrorMessage>
            </div>
            <button
              type="submit"
              onClick={handleLogInClose}
              style={{width:'40%', height:'0.1%', marginLeft : '30%', fontFamily:"Snell Roundhand, cursive"}}
              className={!(dirty && isValid) ? "disabled-btn rounded-pill mb-4 submit" : "rounded-pill submit"}
              disabled={!(dirty && isValid)}
              
            >
              LogIn
            </button>
          </Form>
          )}}
        </Formik>
        
      </Modal.Body>
    </Modal>
  );
};
export default LogIn;
