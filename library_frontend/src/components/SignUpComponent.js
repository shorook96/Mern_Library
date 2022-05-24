import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import userlogo from '../assets/userimages/userlogo.png';
import * as Yup from 'yup';
import axios from 'axios';
import { storage } from './Helpers/FirebaseHelper';

const imageExtensions = ['png', 'jpeg', 'jpg'];
const initialValues = {
  Fname: '',
  Lname: '',
  email: '',
  password: '',
  confirmPassword: '',
  img: '',
};

const validationSchema = Yup.object({
  Fname: Yup.string().required('Required*'),
  Lname: Yup.string().required('Required*'),
  email: Yup.string().email('invalid Email Address').required('Required*'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: Yup.string()
    .required('Required*')
    .oneOf([Yup.ref('password'), null], 'Passwords does not match'),
  // img: Yup.mixed().nullable().required('Required*'),
});

const SignUpComponent = ({ clicked, handleSignUpClose }) => {
  const [image, setImage] = useState({});

  const handleUpload = (values, resetForm) => {
    if (!image.name) {
      submitting(values, '', resetForm);
      return;
    } else {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_change',
        (snapshot) => {},
        (error) => {},
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((URL) => {
              submitting(values, URL, resetForm);
            });
        }
      );
    }
  };
  const submitting = (values, URL, resetForm) => {
    let data = {};
    if (URL) {
      data = { ...values, URL };
    } else {
      data = { ...values };
    }
    console.log(data);
    axios
      .post('http://localhost:5000/user/signup', data)
      .then((response) => {})
      .catch((error) => {
        alert(error.response.data.message);
      });

    setImage({});

    resetForm({ values: '' });
  };

  const changBackGround = (e) => {
    if (e.target.files[0]) {
      const extension = imageExtensions.find(
        (val) => e.target.files[0].name.split('.')[1] === val
      );

      if (extension) {
        setImage(e.target.files[0]);
      } else {
        alert('Image Extension should be png or jpeg or jpg');
      }
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
      style={{
        overlay: {
          background: '#FFFF00',
        },
      }}
    >
      <Modal.Body className="backGroundModalSignUp">
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          style={{ float: 'right', fontSize: '20px' }}
          onClick={handleSignUpClose}
        ></button>

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
                    <Field
                      type="file"
                      id="img"
                      name="img"
                      className="file-input"
                      onChange={changBackGround}
                    />
                  </div>
                </div>
                <h3
                  className="mb-4 p-3 goodreads"
                  style={{ textAlign: 'center' }}
                >
                  goodReads
                </h3>
                <div className="mb-2 ">
                  <label
                    htmlFor="Fname"
                    className="ms-3 ps-5"
                    style={{
                      marginRight: '6%',
                      fontFamily: 'Snell Roundhand, cursive',
                    }}
                  >
                    FirstName
                  </label>
                  <Field
                    type="text"
                    id="Fname"
                    name="Fname"
                    className="border-dark rounded-pill ms-4 "
                    style={{ width: '50%' }}
                  />
                  <ErrorMessage name="Fname">
                    {(error) => (
                      <div className="error" style={{ marginLeft: '42%' }}>
                        {error}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="mb-2 ">
                  <label
                    htmlFor="Lname"
                    className="ms-3 ps-5"
                    style={{
                      marginRight: '6%',
                      fontFamily: 'Snell Roundhand, cursive',
                    }}
                  >
                    LastName
                  </label>
                  <Field
                    type="text"
                    id="Lname"
                    name="Lname"
                    className="border-dark rounded-pill ms-4 "
                    style={{ width: '50%' }}
                  />
                  <ErrorMessage name="Lname">
                    {(error) => (
                      <div className="error" style={{ marginLeft: '42%' }}>
                        {error}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="mb-2 ">
                  <label
                    htmlFor="email"
                    className="ms-3 ps-5"
                    style={{
                      marginRight: '4%',
                      fontFamily: 'Snell Roundhand, cursive',
                    }}
                  >
                    Email address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    className="border-dark rounded-pill ms-2 "
                    style={{ width: '50%' }}
                  />
                  <ErrorMessage name="email">
                    {(error) => (
                      <div className="error" style={{ marginLeft: '42%' }}>
                        {error}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="ms-3 ps-5"
                    style={{
                      marginRight: '11%',
                      fontFamily: 'Snell Roundhand, cursive',
                    }}
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="border-dark rounded-pill ms-2 "
                    style={{ width: '50%' }}
                  />
                  <ErrorMessage name="password">
                    {(error) => (
                      <div className="error" style={{ marginLeft: '42%' }}>
                        {error}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="ms-3 ps-5"
                    style={{ fontFamily: 'Snell Roundhand, cursive' }}
                  >
                    Retype Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="border-dark rounded-pill ms-2 mb-3 "
                    style={{ width: '50%' }}
                  />
                  <ErrorMessage name="confirmPassword">
                    {(error) => (
                      <div className="error" style={{ marginLeft: '42%' }}>
                        {error}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <button
                  type="submit"
                  onClick={handleSignUpClose}
                  className={
                    !(dirty && isValid)
                      ? 'disabled-btn rounded-pill submit'
                      : 'rounded-pill submit'
                  }
                  disabled={!(dirty && isValid)}
                  style={{
                    width: '50%',
                    height: '0.1%',
                    marginLeft: '26%',
                    marginBottom: '10%',
                    fontFamily: 'Snell Roundhand, cursive',
                  }}
                >
                  SignUp
                </button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
export default SignUpComponent;

// import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import userlogo from '../assets/userimages/userlogo.png';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { storage } from './Helpers/FirebaseHelper';
// import { width } from './../../node_modules/@mui/system/esm/sizing';
// import { backgroundColor } from './../../node_modules/@mui/system/esm/palette';
// const imageExtensions = ['png', 'jpeg', 'jpg'];
// const initialValues = {
//   Fname: '',
//   Lname: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
// };

// const validationSchema = Yup.object({
//   Fname: Yup.string().required('Required*'),
//   Lname: Yup.string().required('Required*'),
//   email: Yup.string().email('invalid Email Address').required('Required*'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(8, 'Password is too short - should be 8 chars minimum.'),
//   confirmPassword: Yup.string().oneOf(
//     [Yup.ref('password'), null],
//     'Passwords must match'
//   ),
// });

// const SignUpComponent = ({ clicked, handleSignUpClose }) => {
//   const [image, setImage] = useState({});
//   const handleUpload = (values, resetForm) => {
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//       'state_change',
//       (snapshot) => {}, //current progress
//       (error) => {},
//       () => {
//         storage
//           .ref('images')
//           .child(image.name)
//           .getDownloadURL()
//           .then((URL) => {
//             console.log(URL);
//             const data = { ...values, URL };
//             console.log(data);
//             axios
//               .post('http://localhost:5000/user/signup', data)
//               .then((response) => {
//                 console.log('entered response');
//                 console.log(response);
//               })
//               .catch((error) => {
//                 console.log('entered error');
//                 console.log(error);
//               });
//             setImage({});
//             resetForm({ values: '' });
//           });
//       }
//     );
//   };
//   const changBackGround = (e) => {
//     if (e.target.files[0]) {
//       const extension = imageExtensions.find(
//         (val) => e.target.files[0].name.split('.')[1] === val
//       );
//       if (extension) {
//         setImage(e.target.files[0]);
//         console.log(e.target.files[0]);
//       } else {
//         console.log('msh gjjjjj');
//       }
//     }
//   };

//   const onSubmit = (values, { resetForm }) => {
//     // console.log(values);
//     handleUpload(values, resetForm);
//   };
//   return (
//     <Modal
//       show={clicked}
//       onHide={handleSignUpClose}
//       backdrop="static"
//       className="text-dark"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Create a free account</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Formik
//           initialValues={initialValues}
//           onSubmit={onSubmit}
//           validationSchema={validationSchema}
//         >
//           <Form>
//             <div className="mb-3">
//               <div
//                 className="wrapper"
//                 style={{
//                   backgroundImage: image.name
//                     ? `url(${window.URL.createObjectURL(image)})`
//                     : `url(${userlogo})`,
//                 }}
//               >
//                 <input
//                   type="file"
//                   id="img"
//                   name="img"
//                   className="file-input"
//                   onChange={changBackGround}
//                 />
//               </div>
//             </div>

//             <div className="mb-3">
//               <label htmlFor="Fname">FirstName</label>
//               <Field type="text" id="Fname" name="Fname" autoFocus />
//               <ErrorMessage name="Fname">
//                 {(error) => <div className="error">{error}</div>}
//               </ErrorMessage>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="Lname">LastName</label>
//               <Field type="text" id="Lname" name="Lname" />
//               <ErrorMessage name="Lname">
//                 {(error) => <div className="error">{error}</div>}
//               </ErrorMessage>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email">Email address</label>
//               <Field
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="name@example.com"
//               />
//               <ErrorMessage name="email">
//                 {(error) => <div className="error">{error}</div>}
//               </ErrorMessage>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password">Password</label>
//               <Field type="password" id="password" name="password" />
//               <ErrorMessage name="password">
//                 {(error) => <div className="error">{error}</div>}
//               </ErrorMessage>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="confirmPassword">Retype Password</label>
//               <Field
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//               />
//               <ErrorMessage name="confirmPassword">
//                 {(error) => <div className="error">{error}</div>}
//               </ErrorMessage>
//             </div>

//             <Button type="submit" variant="primary" onClick={handleSignUpClose}>
//               SignUp
//             </Button>
//           </Form>
//         </Formik>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleSignUpClose}>
//           Cancel
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };
// export default SignUpComponent;
