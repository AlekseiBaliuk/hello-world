import React from "react";
import { Form, Button } from "bootstrap-4-react";
import "../../App.css";
import { addToDb, useAuth } from "../../firebase";
import Header from "../../components/Header/Header";
import { Navigate } from "react-router-dom";
import PhoneForm from "../../components/PhoneForm/PhoneForm";

const Register = () => {
  const { signup, signInWithGoogle, isLoggedIn, signInWithFacebook } =
    useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form[0].value;
    const email = form[1].value;
    const password = form[2].value;
    const userData = {
      name,
      email,
      password,
    };

    await signup(email, password);
    addToDb(userData);
  };

  return (
    <>
      <Header />
      <div className="App">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <label htmlFor="exampleInputName">Name</label>
            <Form.Input type="name" id="name" placeholder="Enter name" />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <Form.Input
              type="email"
              id="exampleInputEmail1"
              placeholder="Enter email"
            />
            <Form.Text text="muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputPassword1">Password</label>
            <Form.Input
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </Form.Group>
          <Button className="mr-3 mb-3" primary type="submit">
            Submit
          </Button>

          <Button
            className="mr-3 mb-3"
            primary
            type="button"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </Button>

          <Button primary type="button" onClick={signInWithFacebook}>
            Sign in with Facebook
          </Button>
        </Form>
      </div>

      <PhoneForm />

      {isLoggedIn && <Navigate to="/user" replace={true} />}
    </>
  );
};

export default Register;
