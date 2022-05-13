import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Formik,Field,ErrorMessage,FieldArray,FastField, useFormik} from 'formik'
import axios from 'axios';

const initialValues ={
  Fname:"",
  Lname:"",
  email:"",
  password:"",
  Rpassword:"",
  // img:""
}

const onSubmit = (values,{resetForm}) =>{
  console.log(values)
  axios.post('http://localhost:5000/user/signup', values)
        .then(response => {
            console.log(response)
            

        })
        .catch(error => {
            console.log(error)
            
        })
        
        resetForm({values:""})
        
}

const validate =  values =>{
  let errors = {}
  if (!values.Fname){errors.Fname = 'required'}
  if (!values.Lname){errors.Lname = 'required'}
  if (!values.email){errors.email = 'required'}
  
  
  if (!values.password){errors.password = 'required'}
  if (!values.Rpassword){errors.Rpassword = 'required'}
  // if (!values.img){errors.img = 'required'}
  return errors
  
}

const SignUpComponent = ({ clicked, handleSignUpClose }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
  // console.log(formik.values)
  // console.log(formik.errors)
  return (
    
    <Modal show={clicked} onHide={handleSignUpClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create a free account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor='Fname'>FirstName</Form.Label>
            <Form.Control type="text" id='Fname' name='Fname' onChange={formik.handleChange} value={formik.values.Fname} onBlur={formik.handleBlur}  autoFocus />
            {formik.touched.Fname && formik.errors.Fname ? <div className='error'>{formik.errors.Fname}</div> : null}
        
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor='Lname'>LastName</Form.Label>
            <Form.Control type="text" id='Lname' name='Lname' onChange={formik.handleChange} value={formik.values.Lname} onBlur={formik.handleBlur}  />
            {formik.touched.Lname && formik.errors.Lname ? <div className='error'>{formik.errors.Lname}</div> : null}
        
          </Form.Group>
          {/* controlId="exampleForm.ControlInput1" */}
          <Form.Group className="mb-3" >
            <Form.Label htmlFor='email'>Email address</Form.Label>
            <Form.Control type="email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} placeholder="name@example.com" />
            {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
        
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type="password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} placeholder="" />
            {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
        
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor='Rpassword'>Retype Password</Form.Label>
            <Form.Control type="password" id='Rpassword' name='Rpassword' onChange={formik.handleChange} value={formik.values.Rpassword} onBlur={formik.handleBlur} />
            {formik.touched.Rpassword && formik.errors.Rpassword ? <div className='error'>{formik.errors.Rpassword}</div> : null}
        
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label htmlFor='img'>Upload Image</Form.Label>
            <Form.Control className="" type="file" id='img' name='img' onChange={formik.handleChange} value={formik.values.img} onBlur={formik.handleBlur}/>
            {formik.touched.img && formik.errors.img ? <div className='error'>{formik.errors.img}</div> : null}
        
          </Form.Group> */}
          <Button type='submit' variant="primary" onClick={handleSignUpClose}>
          SignUp
        </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSignUpClose}>
          Cancel
        </Button>
        {/* <Button variant="primary" onClick={handleSignUpClose}>
          SignUp
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};
export default SignUpComponent;
