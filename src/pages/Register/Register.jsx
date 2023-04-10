import React from "react";
import { Form, Button } from "bootstrap-4-react";
import "../../App.css";
import { addToDb, signup, isLoggedIn } from "../../firebase";
import Header from "../../components/Header/Header";
import { Navigate } from "react-router-dom";

const Register = () => {

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
    // console.log(name, email, password);

    const user = await signup(email, password);
    addToDb(userData);
    // setUser(user);
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
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
      </div>

      {isLoggedIn && <Navigate to="/user" replace={true} />}
    </>
  );
};

export default Register;
