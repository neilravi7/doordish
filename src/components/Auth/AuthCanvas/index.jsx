import React, { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import {motion} from "framer-motion";

function AuthCanvas() {
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState('login'); // State to track which form to show

  const handleClose = () => {setShow(false); setFormType('login')};
  const handleShow = () => setShow(true);

  // Function to toggle between login and signup forms
  const toggleFormType = () => {
    setFormType((prevFormType) => (prevFormType === 'login' ? 'signup' : 'login'));
  };

  return (
    <>

      <motion.button whileTap={{ scale: 0.6 }} className="form-control btn btn-md btn-outline-primary" onClick={handleShow}>
        Get Started
      </motion.button>
      {/* <Button variant="outline-dark" onClick={handleShow}>
        Login
      </Button> */}

      <Offcanvas show={show} onHide={handleClose} backdrop="static" className="bg-img">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-primary fs-3' >{formType === 'login' ? 'Login' : 'Sign Up'}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {formType === 'login' ? (
            // Login Form
            // <Form>
            //   <Form.Group controlId="formBasicEmail">
            //     <Form.Label>Email address</Form.Label>
            //     <Form.Control type="email" placeholder="Enter email" />
            //   </Form.Group>

            //   <Form.Group controlId="formBasicPassword" className="mt-3">
            //     <Form.Label>Password</Form.Label>
            //     <Form.Control type="password" placeholder="Password" />
            //   </Form.Group>

            //   <Button variant="primary" type="submit" className="mt-3">
            //     Login
            //   </Button>

            //   <div className="mt-3">
            //     <span>Don't have an account? </span>
            //     <Button variant="link" onClick={toggleFormType}>
            //       Sign Up
            //     </Button>
            //   </div>
            // </Form>

            <>
              <LoginForm></LoginForm>
              <div className="mt-1">
                <span>Don't have an account? </span>

                <Button variant="link" onClick={toggleFormType}>
                  Create Account
                </Button>

              </div>
            </>

          ) : (
            // Signup Form
            // <Form>
            //   <Form.Group controlId="formBasicName">
            //     <Form.Label>Name</Form.Label>
            //     <Form.Control type="text" placeholder="Enter your name" />
            //   </Form.Group>

            //   <Form.Group controlId="formBasicEmail" className="mt-3">
            //     <Form.Label>Email address</Form.Label>
            //     <Form.Control type="email" placeholder="Enter email" />
            //   </Form.Group>

            //   <Form.Group controlId="formBasicPassword" className="mt-3">
            //     <Form.Label>Password</Form.Label>
            //     <Form.Control type="password" placeholder="Password" />
            //   </Form.Group>

            //   <Button variant="primary" type="submit" className="mt-3">
            //     Sign Up
            //   </Button>

            //   <div className="mt-3">
            //     <span>Already have an account? </span>
            //     <Button variant="link" onClick={toggleFormType}>
            //       Login
            //     </Button>
            //   </div>
            // </Form>
            <>
              <SignUpForm></SignUpForm>
              <div className="mt-3">
                <span>Already have an account? </span>
                <Button variant="link" onClick={toggleFormType}>
                  Login
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AuthCanvas;
