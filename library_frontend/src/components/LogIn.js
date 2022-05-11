import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Formik,Field,ErrorMessage,FieldArray,FastField, useFormik} from 'formik'


const initialValues ={
  email:"",
  password:""
}

const onSubmit = values =>{
  console.log(values)
}

const validate =  values =>{
  let errors = {}

  if (!values.email){errors.email = 'required'}
  // else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)){
  //     errors.email = "invalid email formate"
  // }
  if (!values.password){errors.password = 'required'}
  return errors
  
}
const LogIn = ({ clicked, handleLogInClose }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
  // console.log(formik.values)
  // console.log(formik.errors)
  return (
    <Modal show={clicked} onHide={handleLogInClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Welcome Back</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">

            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control type="email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} placeholder="name@example.com" />
            {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}

            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />

          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type="password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} placeholder="" />
            {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                
          </Form.Group>
          <Button type='submit' variant="primary" onClick={handleLogInClose}>
          LogIn
        </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleLogInClose}>
          Cancel
        </Button>
        {/* <Button  variant="primary" onClick={handleLogInClose}>
          LogIn
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default LogIn;
