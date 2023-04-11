import React, { useState } from "react";
import { Form, Button } from "bootstrap-4-react";
import "../../App.css";
import { useAuth } from "../../firebase";
import Header from "../../components/Header/Header";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form[0].value;
    const password = form[1].value;

    const user = await login(email, password);
    setUser(user);
  };

  return (
    <>
      <Header />

      <div className="App">
        <Form onSubmit={handleSubmit}>
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

      {user && <Navigate to="/user" replace={true} />}
    </>
  );
};

export default Login;
