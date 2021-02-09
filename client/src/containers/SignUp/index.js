import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { signUp } from "../../actions";
import { Redirect } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const userSignUp = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    dispatch(signUp(user));
  };

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  if (user.userRegistered) {
    return <Redirect to={`/signIn`} />;
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "70px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignUp}>
              <Row>
                <Col md={6}>
                  <Input
                    type="text"
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
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
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default SignUp;
