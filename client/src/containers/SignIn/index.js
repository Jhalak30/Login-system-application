import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { login } from "../../actions";
import { Redirect, Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "70px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                type="email"
                label="Email address"
                placeholder="Enter email"
                value={email}
                errorMessage="We'll never share your email with anyone else."
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Sign In
              </Button>
              <Link
                to="/forgotPassword"
                style={{ fontSize: "15px", marginLeft: "30px" }}
              >
                Forgot Password ?
              </Link>
            </Form>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Link to={`/signUp`}>Create New User</Link>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col md={{ span: 6, offset: 5 }}>
            <Link to="/privacy" style={{ fontSize: "12px" }}>
              Privacy Policy
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default SignIn;
