import { useState, useEffect } from 'react';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminLogin.css"
// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../../App.css';
import axios from 'axios';
import {adminTokenKey} from '../../globalVariables'




const initialValues = {
  email: "",
  password: ""
}


const validate = values => {
  let errors = {}

  if (!values.email) { errors.email = 'Email is Required' }
  if (!values.password) { errors.password = ' Password is Required' }
  return errors
}


const AdminLogin = ({ logIn }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try{
      const res = await axios({
          method: 'post',
          url: 'http://localhost:5000/admin/login',
          responseType: 'json',
          data: values,
         
      });
      console.log(res.data);
      if(res.status === 200){
        const adminToken = res.data;
        sessionStorage.setItem(adminTokenKey, adminToken);
        resetForm();
        logIn();
      }else{
          alert('Wrong email or Password');
      }
      
  }catch(error){
      alert(error.response.data.message);
  }
  }

  const resetForm = () => {
    setValues(initialValues);
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit} NaclassNameName="formColor">
          <label type= 'text' >Email </label>
        <input type='text'
          name='email'
          value={values.email}
          onChange={handleChange}
          placeholder='example@gmail.com'
        /><br></br><br></br>
        <label type='text'>Password</label>
        <input type='text'
          name='password'
          value={values.password}
          onChange={handleChange}
        /><br></br><br></br>
        <button type="submit" onSubmit={handleSubmit}>Login</button> */}

      {/* </form> */}

      {/* *********************************************form******************************************* */}

      {/* <div NaclassName="login-page">
      <div NaclassName="form">
        <div NaclassName="login">
          <div NaclassName="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>
        <form NaclassName="login-form">
          <input type="text" placeholder="username"/>
          <input type="password" placeholder="password"/>
          <button>login</button>
          <p NaclassName="message">Not registered? <a href="#">Create an account</a></p>
        </form>
      </div>
    </div> */}

      {/* *********************************another Form******************************************** */}
      {/* <form action="" NaclassName="form">

   <span></span>
   <span></span>
   <span></span>
   <span></span>

 <div NaclassName="form-inner">
   <h2>LOGIN</h2>

    <div NaclassName="content">
      <input NaclassName="input" type="text" placeholder="Username" />
      <input NaclassName="input" type="password" placeholder="Password" />
      <button NaclassName="btn">LOGIN</button></div>
   </div>
</form> */}

      {/* ****************************Animated Form ************************************************************* */}

      {/* <div NaclassName="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div NaclassName="user-box">
            <input type="text" required="" name='email'
              value={values.email}
              onChange={handleChange}
              placeholder='example@gmail.com'></input>
            <label>Email</label>
          </div>
          <div NaclassName="user-box">
            <input type="password" required="" name='password'
              value={values.password}
              onChange={handleChange}></input>
            <label>Password</label>
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </a>
        </form>
      </div> */}

      {/* **********************************form************************************************** */}
      <div className='loginContainer'>
        <div className="login-box">
          <h1>login</h1>
          <form action="#">
            <input type="text" name='email'
              value={values.email}
              onChange={handleChange}
              placeholder='example@gmail.com'></input>
            <input type="password" name="password" placeholder="Password" 
            value={values.password}
            onChange={handleChange}></input><br></br>
            <input type="submit" value="Log in" onClick={handleSubmit}></input>
          </form>
        </div>
      </div>


    </>
  )

}
export default AdminLogin;